import { FC } from "react";
import { ProductTile } from "./ProductTile";
import { SelectedProduct } from './types/product';

type Props = Readonly<{
  products: ReadonlyArray<SelectedProduct>;
  onRemove?: (product: SelectedProduct) => void;
  onClear: () => void;
  isDisabled: boolean;
}>

export const SelectedProducts: FC<Props> = props => {
  const isEmpty = !props.products.length;

  return (
    <div className="content">
      <h4 className="title">
        <span className={`text ${!isEmpty ? 'text--is-selected' : ''}`}>
          {createTitle(props.products, !!props.onRemove)}
        </span>
        {!isEmpty && (
          <span className="btn-wrapper">
            <button
              className="btn btn--secondary btn--xs"
              onClick={props.onClear}
              disabled={props.isDisabled}
            >
              Clear
            </button>
          </span>
        )}
      </h4>
      {props.products.map((p, index) => (
        <ProductTile
          key={index}
          product={p.product}
          isDisabled={props.isDisabled}
          onRemove={props.onRemove && (() => props.onRemove?.(p))}
          selectedVariantId={p.variant.id}
          language={p.language}
        />
      ))}
    </div>
  );
};

SelectedProducts.displayName = 'SelectedProducts';

const createTitle = (products: ReadonlyArray<SelectedProduct>, isMultiSelect: boolean): string => {
  if (products.length === 0) {
    return `No product${isMultiSelect ? 's' : ''}`;
  }
  if (isMultiSelect) {
    return `Selected products (${products.length})`
  }
  return 'Selected product';
}
