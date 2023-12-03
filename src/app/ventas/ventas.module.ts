import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DomicilioEntregaComponent } from './pages/domicilio-entrega/domicilio-entrega.component';
import { ConfirmaPagoComponent } from './pages/confirma-pago/confirma-pago.component';
import { NuevaDireccionComponent } from './components/nueva-direccion/nueva-direccion.component';

@NgModule({
  declarations: [
    VentasComponent,
    CarritoComponent,
    DomicilioEntregaComponent,
    ConfirmaPagoComponent,
    NuevaDireccionComponent,
  ],
  imports: [CommonModule, VentasRoutingModule, SharedModule],
  exports: [CarritoComponent],
})
export class VentasModule {}
