import { FC, MouseEvent, useMemo, useState } from 'react';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { Dropdown } from './Dropdown';

type Props = Readonly<{
  product: ProductProjection;
  onSelect?: (variant: ProductVariant) => void;
  onRemove?: () => void;
  isDisabled: boolean;
  selectedVariantId: number | null;
  language: string;
}>;

export const ProductTile: FC<Props> = props => {
  const [selectedVariant, setSelectedVariant] = useState(props.product.masterVariant);

  const remove = (e: MouseEvent) => {
    e.stopPropagation();
    props.onRemove?.();
  };
  const allVariants = useMemo(() => [props.product.masterVariant, ...props.product.variants], [props.product]);
  const variant = allVariants.find(v => v.id === props.selectedVariantId) ?? selectedVariant;
  const name = props.product.name[props.language] ?? '';

  return (
    <div className="tile">
      <div className="title-pane">
        <div className="title">{name}</div>
        {!props.isDisabled && props.onRemove && (
          <div
            className="product-action product-action--remove"
            title="Remove"
            onClick={remove}
          >
            <i className="icon-times" />
          </div>
        )}
      </div>
      <div className="id">SKU: {variant.sku || 'N/A'}</div>
      {variant.images && variant.images.length
        ? <img
          className="preview"
          src={variant.images[0].url}
          alt={variant.images[0].label}
        />
        : <div className="no-image">No image available</div>}
      {!props.selectedVariantId && (
        <div className="tile__actions-pane">
          <Dropdown
            className="tile__action"
            options={allVariants}
            selectedOption={selectedVariant}
            getOptionId={getVariantId}
            getOptionName={getVariantKey}
            onSelectedOptionChange={setSelectedVariant}
            maxDropdownHeight={120}
          />
          <button className="btn btn--primary tile__action" onClick={() => props.onSelect?.(selectedVariant)}>
            Select
          </button>
        </div>
      )}
    </div>
  );
};

ProductTile.displayName = 'ProductTile';

const getVariantId = (v: ProductVariant) => v.id.toString();
const getVariantKey = (v: ProductVariant) => v.key ?? '';
