import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '.././product';
import { ProductService } from '.././product.service';
import { ProductCategory } from '../../product-categories/product-category';
import { ProductCategoryService } from '../../product-categories/product-category.service';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  productForm: FormGroup;
  product: Product;
  categories: ProductCategory[];
  errorMessage: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private productCategoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    // Read the parameter from the route
    const id = +this.route.snapshot.paramMap.get('id');
    const product$ = this.productService.getProduct(id);
    const categories$ = this.productCategoryService.getCategories();

    // get the product and product category data in parallel
    forkJoin([product$, categories$]).subscribe({
      next: ([product, categories]) => {
        this.product = product;
        this.categories = categories;
        this.displayProduct();
      },
      error: err => this.errorMessage = err
    });
  }

  displayProduct(): void {
    if (this.product) {
      // Define the form
      this.productForm = this.fb.group({
        productName: [this.product.productName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        productCode: [this.product.productCode, Validators.required],
        description: this.product.description,
        categoryId: this.product.categoryId
      });

      // Set tje appropriate page title
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    } else {
      this.pageTitle = 'Product not found';
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.productService.updateProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
