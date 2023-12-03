import { InventarioModelo } from "src/app/productos/models/productos.modelo";

export class ProductoCarritoModelo {
  _id: any;
  categoryID: string;
  productoID: string;
  category: string;
  title: string;
  description: string;
  categorySex: string;
  imageUrl: string;
  talla: string;
  cantidad: number;
  existencia: number;
  precio: number;
  codigo: string;
  subtotal: number;

  constructor(data: any, categoria: string, objTalla: InventarioModelo) {
    this._id = data._id;
    this.categoryID = data.categoryID;
    this.productoID = data._id.$oid;
    this.category = categoria;
    this.title = data.title;
    this.description = data.description;
    this.categorySex = data.categorySex;
    this.imageUrl = data.imageUrl;
    this.talla = objTalla.talla;
    this.cantidad = data.cantidad;
    this.existencia = objTalla.inventario;
    this.precio = data.precio;
    this.codigo = data.codigo;
    this.subtotal = data.subtotal;
  }
}

export class AltaCarrito {
  _id: any;
  fechaVenta: Date;
  total: number;
  productos: ProductoCarritoModelo[];
  clienteID: string;
  nombreCliente: string;
  emailCliente: string;
  direccionEntrega: DireccionModelo;

  constructor(data: any) {
    this._id = data._id;
    this.fechaVenta = data.fechaVenta;
    this.total = data.total;
    this.productos = data.productos;
    this.clienteID = data.clienteID;
    this.nombreCliente = data.nombreCliente;
    this.emailCliente = data.emailCliente;
    this.direccionEntrega = data.direccionEntrega;
  }
}

export interface DireccionModelo {
  _id: any;
  clienteID: string;
  nombre: string;
  estado: string;
  municipio: string;
  colonia: string;
  calle: string;
  telefono: string;
  indicaciones: string;
}
