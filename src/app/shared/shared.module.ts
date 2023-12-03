import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material.module';
import { CarruselComponent } from './carrusel/carrusel.component';
import { HttpClientModule } from '@angular/common/http';
import { AvisoPrivacidadComponent } from './aviso-privacidad/aviso-privacidad.component';
import { MisionVisionComponent } from './mision-vision/mision-vision.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCerrarSesionComponent } from './modal-cerrar-sesion/modal-cerrar-sesion.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CarruselComponent,
    AvisoPrivacidadComponent,
    MisionVisionComponent,
    PreguntasFrecuentesComponent,
    ModalCerrarSesionComponent,
    PedidosComponent,
    PageNoFoundComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    BreadcrumbModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MaterialModule,
    CarruselComponent,
    HttpClientModule,
    CarruselComponent,
    AvisoPrivacidadComponent,
    MisionVisionComponent,
    PreguntasFrecuentesComponent,
    ReactiveFormsModule,
    FormsModule,
    PedidosComponent,
    BreadcrumbModule,
    RouterModule
  ],
})
export class SharedModule {}
