import { Product } from "../Models/Product";

export interface ProductSearchResult {
  products: Product[];
  pages: number;
  currentPage: number;
}
