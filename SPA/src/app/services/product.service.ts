import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../Models/Product';
import { ServiceResponse } from '../DTOs/ServiceResponse';
import { ProductSearchResult } from '../DTOs/ProductSearchResult ';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = environment.apiUrl + '/product';

  productsChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  Products: Product[] = [];
  Message: string = 'Loading products...';
  CurrentPage: number = 1;
  PageCount: number = 0;
  LastSearchText: string = '';
  AdminProducts: Product[] = [];

  getProducts(categoryUrl: string | null): Observable<Product[]> {
    const url = categoryUrl
      ? `${this.baseUrl}/category/${categoryUrl}`
      : `${this.baseUrl}/featured`;

    return this.http.get<ServiceResponse<Product[]>>(url).pipe(
      map((result) => result.data || []),
      tap((products) => {
        this.CurrentPage = 1;
        this.PageCount = 0;
        this.Products = products;
        if (products.length === 0) {
          this.Message = 'No products found';
          console.log(this.Message)
        }
        this.productsChanged.emit();
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      })
    );
  }

  searchProducts(searchText: string, page: number): Observable<Product[]> {
    const url = `${this.baseUrl}/search/${searchText}/${page}`;

    return this.http.get<ServiceResponse<ProductSearchResult>>(url).pipe(
      map((result) => result.data?.Products || []),
      tap((data) => {
        this.CurrentPage = 1;
        this.PageCount = 0;
        this.Products = data;
        if (data.length === 0) {
          this.Message = 'No products found';
        }
        this.productsChanged.emit();
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      })
    );
  }



}

