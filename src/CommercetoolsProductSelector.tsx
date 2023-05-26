import { ProductProjection } from "@commercetools/platform-sdk";
import { FC, useCallback, useLayoutEffect, useState } from "react";

import { PoweredByLogo } from "./PoweredByLogo";
import { ProductTile } from "./ProductTile";
import { SearchInput } from "./SearchInput";
import { SelectedProducts } from "./SelectedProducts";
import { ElementConfig, isElementConfig } from "./types/elementConfig";
import { SavedProduct, SelectedProduct } from "./types/product";
import { loadLanguages, loadSelectedProducts, searchProducts } from "./utils/commercetoolsLoaders";
import { useCustomElement } from "./utils/useCustomElement";

export const CommercetoolsProductSelector: FC = () => {
  const [currentValue, setCurrentValue] = useState<null | ReadonlyArray<SelectedProduct>>(null);
  const [searchResults, setSearchResults] = useState<ReadonlyArray<ProductProjection>>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [allLanguages, setAllLanguages] = useState<null | ReadonlyArray<string>>(null);

  const {
    updateSize,
    updateValue: updateElementValue,
    config,
    isDisabled,
  } = useCustomElement({
    isValidConfig: isElementConfig,
    minHeight: 150,
    paddingBottom: 80,
    processValue: (value: string, config: ElementConfig, setConfig: (c: ElementConfig) => void) =>
      loadLanguages(config)
        .then(languages => {
          setAllLanguages(languages);
          const defaultLanguage = languages.includes(config.commercetools.defaultCulture)
            ? config.commercetools.defaultCulture
            : languages[0] ?? "";

          setConfig({
            ...config,
            commercetools: {
              ...config.commercetools,
              defaultCulture: defaultLanguage,
            },
          });
          setSelectedLanguage(defaultLanguage);

          return loadSelectedProducts(config, JSON.parse(value) ?? [], languages)
            .then(setCurrentValue);
        }),
  });

  const updateValue = useCallback((newValue: ReadonlyArray<SelectedProduct>) => {
    if (!selectedLanguage) {
      return;
    }

    const valueToSave = newValue
      .map(({ product, variant }): SavedProduct => ({
        id: product.id,
        variantId: variant.id,
        culture: selectedLanguage,
      }));
    updateElementValue(valueToSave);
    setCurrentValue(newValue);
  }, [selectedLanguage, updateElementValue]);

  useLayoutEffect(() => {
    updateSize();
  }, [updateSize, currentValue, searchResults]);

  if (!currentValue || !config || !selectedLanguage || !allLanguages) {
    return null;
  }

  const search = (searchString: string) =>
    searchProducts(config, allLanguages, selectedLanguage, searchString)
      .then(setSearchResults);

  const onRemove = config.isMultiSelect
    ? (p: SelectedProduct) => updateValue(currentValue.filter(v => v !== p))
    : undefined;

  return (
    <>
      <SelectedProducts
        products={currentValue}
        onRemove={onRemove}
        isDisabled={isDisabled}
        onClear={() => updateValue([])}
      />
      <div>
        <SearchInput
          isDisabled={isDisabled}
          onSubmit={search}
          onClear={() => setSearchResults([])}
          languages={allLanguages}
          selectedLanguage={selectedLanguage}
          onChangeSelectedLanguage={setSelectedLanguage}
        />
        {!!searchResults.length && (
          <div className="results">
            <h4>Search results ({searchResults.length})</h4>
            {searchResults.map(product => (
              <ProductTile
                key={product.id}
                product={product}
                onSelect={variant =>
                  updateValue(
                    config.isMultiSelect
                      ? [...currentValue, { product, variant, language: selectedLanguage }]
                      : [{ product, variant, language: selectedLanguage }],
                  )}
                isDisabled={isDisabled}
                language={selectedLanguage}
                selectedVariantId={null}
              />
            ))}
          </div>
        )}
      </div>
      <PoweredByLogo />
    </>
  );
};

CommercetoolsProductSelector.displayName = "CommercetoolsProductSelector";
