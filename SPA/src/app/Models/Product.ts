import { Category } from "./Category";
import { ProductVariant } from "./ProductVariant";
import { Image } from "./Image";
export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  images: Image[];
  category?: Category; // Optional property
  categoryId: number;
  featured: boolean;
  variants: ProductVariant[];
  visible: boolean;
  deleted: boolean;
  editing?: boolean; // Optional property
  isNew?: boolean; // Optional property
}
