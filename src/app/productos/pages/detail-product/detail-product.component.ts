import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CategoryModelo,
  InventarioModelo,
  ProductoModelo,
} from '../../models/productos.modelo';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { combineLatest } from 'rxjs';
import {
  showNotifyError,
  showNotifySuccess,
  showNotifyWarning,
} from 'src/app/shared/functions/Utilities';
import { ProductoCarritoModelo } from 'src/app/ventas/models/ventas.modelo';
import { VentasService } from 'src/app/ventas/services/ventas.service';
import { SwPush } from '@angular/service-worker';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  urlImage = environment.urlImg;
  objCategories!: CategoryModelo[];
  objProducto!: ProductoModelo;
  objCarritoProducto!: ProductoCarritoModelo;
  loading = false;
  category!: string;
  cantidad = 1;
  objTalla!: InventarioModelo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _ps: ProductosService,
    private _vs: VentasService,
    private swPush: SwPush,
    private _ns: NotificationsService
  ) {}

  ngOnInit(): void {
    console.log('DetailProductComponent');
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.consultaInfo(res['ID']);
      }
    });
  }

  ngOnDestroy() {
    if (this.objTalla && this.objTalla.inventario < 3) {
      const notification = {
        notification: {
          title: ' ¡Últimas unidades disponibles!',
          body: `El producto ${this.objProducto.title} está volando de nuestros estantes. ¡Asegúrate de obtener el tuyo antes de que se agote!`,
          vibrate: [100, 50, 100],
          url: 'https://sastrerialospajaritos.proyectowebuni.com/',
          image:
            `${this.urlImage}/${this.objProducto.imageUrl}`,
          actions: [
            {
              action: 'explore',
              title: 'Ver producto',
            },
          ],
        },
      };
      this.swPush.subscription.subscribe((sub) => {
        this._ns.sendNotification(sub, notification).subscribe();
      });
    }
  }

  consultaInfo(id: string): void {
    this.loading = true;
    combineLatest(this._ps.getProduct(id), this._ps.getCategories()).subscribe(
      (res) => {
        this.objProducto = res[0][0];
        this.objCategories = res[1];
        let resp = this.objCategories.find(
          (cat) => (cat._id.$oid = this.objProducto.categoryID)
        );
        this.category = resp ? resp.name : '';
        this.setDatoDefaultTalla(this.objProducto);
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error al consultar información', 'Intente más tarde');
      }
    );
  }

  private setDatoDefaultTalla(prod: ProductoModelo) {
    prod.inventario.forEach((i) => {
      if (i.inventario > 0) {
        this.objTalla = i;
      }
    });
  }

  private setDatoscarrito() {
    this.objCarritoProducto = new ProductoCarritoModelo(
      this.objProducto,
      this.category,
      this.objTalla
    );
  }

  setCantidad(input: any, objTalla: InventarioModelo = this.objTalla) {
    this.objTalla = objTalla;
    if (parseFloat(input.value) > this.objTalla.inventario) {
      showNotifyWarning(
        '',
        'No se puede solicitar más cantidad de la existente'
      );
      input.value = this.objTalla.inventario;
      return;
    }
    if (parseFloat(input.value) <= 0) {
      showNotifyWarning('', 'Por favor, ingrese una cantidad válida');
      input.value = this.cantidad;
      return;
    }
    this.cantidad = parseFloat(input.value);
  }

  comprarAhora() {
    this.setDatoscarrito();
    this.objCarritoProducto.cantidad = this.cantidad;
  }

  agregarAlCarrito() {
    this.setDatoscarrito();
    this.objCarritoProducto.cantidad = this.cantidad;
    this._vs.setProductoCarrito(this.objCarritoProducto);
    showNotifySuccess('', 'Producto agregado al carrito');
  }
}
