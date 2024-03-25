import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Models/Product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = []

  searchText: string | null = null;
  categoryUrl: string | null = null;
  page: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.searchText = params['searchText'] || null;
      this.categoryUrl = params['categoryUrl'] || null;
      this.page = +params['page'] || 1; // Added "+" to convert string to number

      if (this.searchText) {
        this.productService.searchProducts(this.searchText, this.page).subscribe(
          (products) => {
            this.products = products; // Set fetched products
          }
        );
      } else {
        this.productService.getProducts(this.categoryUrl).subscribe(
          (products) => {
            this.products = products; // Set fetched products
          }
        );
      }
    });
  }
}
