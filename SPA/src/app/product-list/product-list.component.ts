import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../Models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit {
  Products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.productsChanged.subscribe(() => {
      this.Products = this.productService.Products || []; // Use optional chaining
    });
  }

  GetPriceText(product: Product): string {
    const variants = product?.Variants || []; // Use optional chaining

    if (variants.length === 0) {
      return '';
    } else if (variants.length === 1) {
      return `$${variants[0].Price}`;
    }

    const minPrice = Math.min(...variants.map((v) => v.Price));
    return `Starting at $${minPrice}`;
  }
}
