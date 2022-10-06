import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

export type SavedProduct = Readonly<{
  id: string;
  variantId: number;
  culture: string;
}>;

export type SelectedProduct = Readonly<{
  product: ProductProjection;
  variant: ProductVariant;
  language: string;
}>;
