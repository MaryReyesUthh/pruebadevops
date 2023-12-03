import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
  ], 
  exports: [
    HomeComponent,
  ]
})
export class PagesModule { }
