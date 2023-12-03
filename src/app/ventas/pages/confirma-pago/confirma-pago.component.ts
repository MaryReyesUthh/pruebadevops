import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VentasService } from '../../services/ventas.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AltaCarrito } from '../../models/ventas.modelo';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-confirma-pago',
  templateUrl: './confirma-pago.component.html',
  styleUrls: ['./confirma-pago.component.scss']
})
export class ConfirmaPagoComponent implements OnInit {

  direccionID = '';
  urlImage = environment.urlImg;
  altaCarrito = new AltaCarrito({});

  constructor(
    private _vs: VentasService,
    private router: Router,
    private _auth: AuthService,
  ) {
    this.altaCarrito = this._vs.altaCarrito;
  }

  ngOnInit(): void {
    this.calculaDatosCarrito();
  }

  calculaDatosCarrito() {
    this.altaCarrito.total = 0;
    this.altaCarrito.productos.forEach(
      (prod) => (this.altaCarrito.total += prod.cantidad * prod.precio)
    );
  }

  confirmarCompra() {
    showModalConfirmation(
      'Confirmar compra',
      'Para continuar, confirme la compra'
    ).then((res) => {
      if (res) {
        this._vs.createSale(this.altaCarrito).subscribe(
          (res: any) => {
            showNotifySuccess(
              'Compra realizada',
              'Su compra se realizó correctamente'
            );
            this.router.navigate(['home']);
            this._vs.cleanCarrito();
            this._vs.cleanAltaCarrito();
          },
          (e) => {
            showNotifyError('Error al conectar con el servidor', 'Intente mas tarde');
          }
        );
      }
    });
  }

  getCantProductos(sale: AltaCarrito) {
    if(!sale) return;
    let cant = 0;
    sale.productos.forEach(prod => cant += prod.cantidad);
    return cant;
  }

  cambiarDireccion() {
    this.router.navigate(['home/ventas/domicilio-entrega']);
  }

}
