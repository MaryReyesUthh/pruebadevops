import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PedidosComponent } from '../shared/pedidos/pedidos.component';
import { DomicilioEntregaComponent } from './pages/domicilio-entrega/domicilio-entrega.component';
import { ConfirmaPagoComponent } from './pages/confirma-pago/confirma-pago.component';

const routes: Routes = [
  {
    path: '',
    component: VentasComponent,
    children: [
      {
        path: 'carrito',
        data: { breadcrumb: 'Carrito' },
        component: CarritoComponent,
      },
      {
        path: 'domicilio-entrega',
        data: { breadcrumb: 'Lugar de entrega' },
        component: DomicilioEntregaComponent,
      },
      {
        path: 'confirmar-compra',
        data: { breadcrumb: 'Confirmar compra' },
        component: ConfirmaPagoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
