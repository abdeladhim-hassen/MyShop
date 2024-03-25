import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../Models/Product';
import { ServiceResponse } from '../DTOs/ServiceResponse';
import { ProductSearchResult } from '../DTOs/ProductSearchResult ';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/product`;

  productsChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}
  Message = 'Loading products...';
  CurrentPage = 1;
  PageCount = 0;
  LastSearchText = '';
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
        if (products.length === 0) {
          this.Message = 'No products found';
          console.log(this.Message);
        }
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      })
    );
  }

  searchProducts(searchText: string, page: number) {
    const url = `${this.baseUrl}/search/${searchText}/${page}`;

    return this.http.get<ServiceResponse<ProductSearchResult>>(url).pipe(
      map((result) => result.data?.products || []),
      tap((data) => {
        this.CurrentPage = 1;
        this.PageCount = 0;
        if (data.length === 0) {
          this.Message = 'No products found';
        }
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      })
    );
  }
  getProductSearchSuggestions(searchText: string): Observable<ServiceResponse<string[]>> {
    const url = `${this.baseUrl}/searchsuggestions/${searchText}`;
    return this.http.get<ServiceResponse<string[]>>(url);
  }
}
