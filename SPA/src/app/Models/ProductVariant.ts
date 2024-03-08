import { ProductType } from "./ProductType";

export interface ProductVariant {
    ProductId: number;
    ProductType?: ProductType; // Optional property
    ProductTypeId: number;
    Price: number;
    OriginalPrice: number;
    Visible: boolean;
    Deleted: boolean;
    Editing?: boolean; // Optional property
    IsNew?: boolean; // Optional property
  }