import { ProductType } from "./ProductType";

export interface ProductVariant {
    productId: number;
    productType?: ProductType; // Optional property
    productTypeId: number;
    price: number;
    originalPrice: number;
    visible: boolean;
    deleted: boolean;
    editing?: boolean; // Optional property
    isNew?: boolean; // Optional property
  }
