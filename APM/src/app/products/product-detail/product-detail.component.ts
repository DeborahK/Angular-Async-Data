import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductResolved } from '../product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Long for without destructuring
    // const resolvedData: ProductResolved = this.route.snapshot.data['resolvedData'];
    // this.product = resolvedData.product;
    // this.errorMessage = resolvedData.error;

    // Use object destructuring to read the pieces of the resolved data.
    const {product, error} = this.route.snapshot.data['resolvedData'];
    this.product = product;
    this.errorMessage = error;

    // Display the appropriate page header
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

}
