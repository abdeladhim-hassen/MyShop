import { Product } from "../Models/Product";

export interface ProductSearchResult {
  Products: Product[];
  Pages: number;
  CurrentPage: number;
}
