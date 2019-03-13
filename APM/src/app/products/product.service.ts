import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, concatMap, mergeMap, first, take } from 'rxjs/operators';

import { Product } from './product';
import { Supplier } from '../suppliers/supplier';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = 'api/suppliers';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // AntiPattern: Nested (or chained) http calls returns nested observables
  // getProductWithSuppliers(id: number) {
  //   const productUrl = `${this.productsUrl}/${id}`;
  //   return this.http.get<Product>(productUrl)
  //     .pipe(
  //       map(product => {
  //         const supplierUrl = `${this.suppliersUrl}?productId=${id}`;
  //         return this.http.get(supplierUrl).pipe(tap(data => console.log(data)));
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  // Gets the suppliers for a particular product given the product Id
  getSuppliersForProduct(id: number): Observable<Supplier[]> {
    const supplierUrl = `${this.suppliersUrl}?productId=^${id}$`;
    return this.http.get<Supplier[]>(supplierUrl)
      .pipe(
        tap(data => console.log('getSuppliers: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // To get the suppliers for a product
  // Given the product name
  // Gets the product to obtain the Id
  // The query returns an array, so maps to the first product in the array
  // Uses the id to get the suppliers
  // Only returns the suppliers (not the product)
  getSuppliersForProductByName(productName: string): Observable<Supplier[]> {
    const productUrl = `${this.productsUrl}?productName=^${productName}$`;
    return this.http.get<Product>(productUrl)
      .pipe(
        map(products => products[0]),
        mergeMap(product => {
          const supplierUrl = `${this.suppliersUrl}?productId=^${product.id}$`;
          return this.http.get<Supplier[]>(supplierUrl);
        }),
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this.http.post<Product>(this.productsUrl, product, { headers: headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers: headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeProduct(): Product {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productCode: null,
      categoryId: null,
      tags: [],
      price: null,
      description: null
    };
  }
}
