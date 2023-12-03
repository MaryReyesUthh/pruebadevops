import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ListCategoriesComponent } from './pages/list-categories/list-categories.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    children: [
      {
        path: 'category/:type',
        data: { breadcrumb: 'Categorías' },
        component: ListCategoriesComponent,
      },
      {
        path: 'list-products/category',
        data: { breadcrumb: 'Categoría' },
        component: ListProductsComponent,
      },
      {
        path: 'product-detail',
        data: { breadcrumb: 'Detalle del producto' },
        component: DetailProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
