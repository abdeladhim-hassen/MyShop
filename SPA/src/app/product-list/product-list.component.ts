import { Component, Input } from '@angular/core';
import { Product } from '../Models/Product'; // Assuming the correct import path
import { ProductVariant } from '../Models/ProductVariant';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  constructor(public productService: ProductService) {}

  GetMinPriceVariant(product: Product): ProductVariant | null {
    const variants = product?.variants || [];

    if (variants.length === 0) {
      return null;
    } else if (variants.length === 1) {
      return variants[0];
    }

    const minPriceVariant = variants.reduce((min, current) => (current.price < min.price ? current : min));
    return minPriceVariant;
  }
}
