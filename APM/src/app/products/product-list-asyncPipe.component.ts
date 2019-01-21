import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-list-asyncPipe.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListAsyncPipeComponent implements OnInit {
  pageTitle = 'Product List';
  products$: Observable<Product[]>;
  errorMessage = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }
}
