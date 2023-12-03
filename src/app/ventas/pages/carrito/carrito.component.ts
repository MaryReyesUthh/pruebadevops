import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VentasService } from '../../services/ventas.service';
import { AltaCarrito, ProductoCarritoModelo } from '../../models/ventas.modelo';
import { environment } from 'src/environments/environment';
import { showModalConfirmation, showNotifyWarning } from 'src/app/shared/functions/Utilities';
import { ProductoModelo } from 'src/app/productos/models/productos.modelo';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  form!: FormGroup;
  Productos: ProductoCarritoModelo[] = [];
  urlImage = environment.urlImg;
  altaCarrito = new AltaCarrito({});

  constructor(
    private _vs: VentasService,
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService
  ) {
    this.form = new FormGroup({});
    this.Productos = this._vs.arrProductos;
  }

  ngOnInit(): void {
    this.Productos.forEach((prod) => {
      this.form.addControl(
        prod._id.$oid,
        this.fb.control(
          new FormControl(prod.cantidad, [
            Validators.required,
            Validators.min(1),
          ])
        )
      );
    });
    this.calculaDatosCarrito();
  }

  setCantidad(input: any, producto: ProductoCarritoModelo) {
    if (parseFloat(input.value) > producto.existencia) {
      showNotifyWarning(
        '',
        'No se puede solicitar más cantidad de la existente'
      );
      input.value = producto.existencia;
      return;
    }
    if (parseFloat(input.value) <= 0) {
      showNotifyWarning('', 'Por favor, ingrese una cantidad válida');
      input.value = producto.cantidad;
      return;
    }
    producto.cantidad = parseFloat(input.value);
    this._vs.setCantidadProductoCarrito(producto);
    this.calculaDatosCarrito();
  }

  eliminarProducto(producto: ProductoCarritoModelo) {
    this._vs.deleteProductoCarrito(producto);
    this.Productos = this._vs.arrProductos;
    this.calculaDatosCarrito();
  }

  calculaDatosCarrito() {
    this.altaCarrito.total = 0;
    this.Productos.forEach(
      (prod) => (this.altaCarrito.total += prod.cantidad * prod.precio)
    );
  }

  verProducto(producto: ProductoCarritoModelo) {
    this.router.navigate(['/home/list-categories/product-detail'], {
      queryParams: { ID: producto._id.$oid },
    });
  }

  continuarCompra() {
    if(!this._auth.isAuth()) {
      showModalConfirmation(
        'Iniciar sesión',
        'Para continuar, debe iniciar sesión',
        'Iniciar sesión',
        'Continuar en el carrito'
      ).then((res) => {
        if (res) {
          this.router.navigate(['/home/login']);
        }
      });
      return;
    }
    this.router.navigate(['/home/ventas/domicilio-entrega']);
  }
}
