import { Component, OnInit } from '@angular/core';
import {
  AltaCarrito,
  DireccionModelo,
  ProductoCarritoModelo,
} from '../../models/ventas.modelo';
import { environment } from 'src/environments/environment';
import { VentasService } from '../../services/ventas.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NuevaDireccionComponent } from '../../components/nueva-direccion/nueva-direccion.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  showModalConfirmation,
  showNotifyError,
  showNotifySuccess,
} from 'src/app/shared/functions/Utilities';
import { LoginService } from 'src/app/login/services/login.service';
import { ClienteModelo } from 'src/app/login/models/cliente.modelo';

@Component({
  selector: 'app-domicilio-entrega',
  templateUrl: './domicilio-entrega.component.html',
  styleUrls: ['./domicilio-entrega.component.scss'],
})
export class DomicilioEntregaComponent implements OnInit {
  Productos: ProductoCarritoModelo[] = [];
  direccionID = '';
  urlImage = environment.urlImg;
  altaCarrito = new AltaCarrito({});
  direcciones: DireccionModelo[] = [];

  constructor(
    private _vs: VentasService,
    private router: Router,
    private matDialog: MatDialog,
    private _auth: AuthService,
    private _ls: LoginService
  ) {
    this.Productos = this._vs.arrProductos;
  }

  ngOnInit(): void {
    this.calculaDatosCarrito();
    this.getDirecciones();
  }

  getDirecciones() {
    this._vs.getDirecciones(this._auth.token).subscribe(
      (res: DireccionModelo[]) => {
        this.direcciones = res;
        if (this.direcciones.length > 0)
          this.direccionID = this.direcciones[0]._id.$oid;
      },
      (e) => {
        showNotifyError('Error consultar las direcciones', 'Intente mas tarde');
      }
    );
  }

  calculaDatosCarrito() {
    this.altaCarrito.total = 0;
    this.Productos.forEach(
      (prod) => (this.altaCarrito.total += prod.cantidad * prod.precio)
    );
  }

  continuarCompra() {
    const dir = this.direcciones.find(direc => direc._id.$oid === this.direccionID);
    if(dir) {
      this.altaCarrito.direccionEntrega = dir;
    }
    this.altaCarrito.clienteID = this._auth.token;
    this.altaCarrito.productos = this.Productos;

    this._ls.getUsuario(this._auth.token).subscribe((res: ClienteModelo[]) => {
      this.altaCarrito.nombreCliente = res[0].name;
      this.altaCarrito.emailCliente = res[0].email;
      this._vs.setAltaCarrito(this.altaCarrito);
      this.router.navigate(['/home/ventas/confirmar-compra']);
    },
    (e) => {
      showNotifyError('Error consultar al servidor', 'Intente mas tarde');
    })
  }

  openModalDireccion(isNew: boolean, direccion?: DireccionModelo) {
    this.matDialog
      .open(NuevaDireccionComponent, {
        panelClass: 'sinpadding',
        width: '700px',
        height: 'auto',
        data: {
          isNew,
          direccion,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.getDirecciones();
      });
  }

  eliminarDireccion(direccion: DireccionModelo) {
    showModalConfirmation(
      'Eliminar dirección',
      '¿Seguro que deseas eliminar esta dirección?'
    ).then((res) => {
      if (res) {
        this._vs.deleteDireccion(direccion._id.$oid).subscribe(
          (res: any) => {
            showNotifySuccess(
              'Dirección eliminada',
              'La dirección se eliminó correctamente'
            );
            this.getDirecciones();
          },
          (e) => {
            showNotifyError('Error al actualizar', 'Intente mas tarde');
          }
        );
      }
    });
  }
}
