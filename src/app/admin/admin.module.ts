import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ModalCategoryComponent } from './components/modal-category/modal-category.component';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { MantenimientoBdComponent } from './pages/mantenimiento-bd/mantenimiento-bd.component';



@NgModule({
  declarations: [
    HomeAdminComponent,
    AdminComponent,
    ProductsComponent,
    UsersComponent,
    CategoriesComponent,
    ModalCategoryComponent,
    ModalProductComponent,
    ModalUserComponent,
    MantenimientoBdComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
