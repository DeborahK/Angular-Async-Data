import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError, Subject, forkJoin, from } from 'rxjs';
import { catchError, tap, map, concatMap, mergeMap, first, take, concatAll, mergeAll, toArray, switchMap } from 'rxjs/operators';

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

  // Gets a single product by id
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

  // AntiPattern: Nested (or chained) http calls results in nested observables
  // that are difficult to process
  // First, get the product
  // For each supplier for that product, get the supplier info
  // getProductSuppliers(id: number) {
  //   const productUrl = `${this.productsUrl}/${id}`;
  //   return this.http.get<Product>(productUrl)
  //     .pipe(
  //       map(product =>
  //         product.supplierIds.map(supplierId => {
  //           const supplierUrl = `${this.suppliersUrl}/${supplierId}`;
  //           return this.http.get(supplierUrl);
  //         })
  //       ),
  //       catchError(this.handleError)
  //     );
  // }

  // Gets the first supplier.
  // getProductSuppliers(id: number): Observable<Supplier> {
  //   const productUrl = `${this.productsUrl}/${id}`;
  //   return this.http.get<Product>(productUrl)
  //     .pipe(
  //       tap(x => console.log(x)),
  //       mergeMap(product => {
  //         const supplierUrl = `${this.suppliersUrl}/${product.supplierIds[0]}`;
  //         return this.http.get<Supplier>(supplierUrl);
  //       }
  //       ),
  //       catchError(this.handleError)
  //     );
  // }

  // Gets all suppliers for a product using mergeMap and concatAll.
  // But this returns one supplier at a time.
  // getProductSuppliers(id: number): Observable<Supplier> {
  //   const productUrl = `${this.productsUrl}/${id}`;
  //   return this.http.get<Product>(productUrl)
  //     .pipe(
  //       mergeMap(product =>
  //         product.supplierIds.map(supplierId => {
  //           const supplierUrl = `${this.suppliersUrl}/${supplierId}`;
  //           return this.http.get<Supplier>(supplierUrl);
  //         })
  //       ),
  //       concatAll(),
  //       catchError(this.handleError)
  //     );
  // }

  // Gets all suppliers for a product as an array.
  getProductSuppliers(id: number): Observable<Supplier[]> {
    const productUrl = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(productUrl)
      .pipe(
        mergeMap(product =>
          from(product.supplierIds).pipe(
            mergeMap(supplierId => {
              const supplierUrl = `${this.suppliersUrl}/${supplierId}`;
              return this.http.get<Supplier>(supplierUrl);
            })
          )),
        toArray(),
        catchError(this.handleError)
      );
  }

  // Gets all suppliers for a product one by one.
  // If the second mergeMap is changed to switchMap, only one value is displayed.
  getProductSuppliersOneByOne(id: number): Observable<Supplier> {
    const productUrl = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(productUrl)
      .pipe(
        mergeMap(product =>
          from(product.supplierIds).pipe(
            mergeMap(supplierId => {
              const supplierUrl = `${this.suppliersUrl}/${supplierId}`;
              return this.http.get<Supplier>(supplierUrl);
            })
          )),
        catchError(this.handleError)
      );
  }

  // Pass out both using concat??

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this.http.post<Product>(this.productsUrl, product, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers })
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
