import { Category } from "./Category";
import { ProductVariant } from "./ProductVariant";
import { Image } from "./Image";
export interface Product {
  Id: number;
  Title: string;
  Description: string;
  ImageUrl: string;
  Images: Image[];
  Category?: Category; // Optional property
  CategoryId: number;
  Featured: boolean;
  Variants: ProductVariant[];
  Visible: boolean;
  Deleted: boolean;
  Editing?: boolean; // Optional property
  IsNew?: boolean; // Optional property
}