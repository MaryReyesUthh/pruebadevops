import { Component, OnInit } from '@angular/core';
import { AltaCarrito } from 'src/app/ventas/models/ventas.modelo';
import { VentasService } from 'src/app/ventas/services/ventas.service';
import { AuthService } from '../services/auth.service';
import { showNotifyError } from '../functions/Utilities';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  urlImageBanner = '';
  objSales!: AltaCarrito[];
  constructor(private _vs: VentasService, private _auth: AuthService) {}

  ngOnInit(): void {
    this.consultaInfo();
  }

  consultaInfo(): void {
    this._vs.getSales(this._auth.token).subscribe(
      (res) => {
        this.objSales = res;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  getCantProductos(sale: AltaCarrito) {
    if(!sale) return;
    let cant = 0;
    sale.productos.forEach(prod => cant += prod.cantidad);
    return cant;
  }

}
