import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductListAsyncPipeComponent } from './product-list/product-list-asyncPipe.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListCategoryComponent } from './product-list/product-list-category.component';
import { ProductSuppliersComponent } from './product-suppliers/product-suppliers.component';

import { ProductResolver } from './product-detail/product-resolver.service';
import { ProductEditGuard } from './product-edit/product-edit.guard';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'asyncPipe',
        component: ProductListAsyncPipeComponent
      },
      {
        path: 'category',
        component: ProductListCategoryComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductResolver }
      },
      {
        path: ':id/suppliers',
        component: ProductSuppliersComponent
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductListAsyncPipeComponent,
    ProductListCategoryComponent,
    ProductDetailComponent,
    ProductSuppliersComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
