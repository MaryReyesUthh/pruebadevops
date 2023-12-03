export interface CategoryModelo {
  _id: any;
  name: string;
  description: string;
  categorySex: string;
  imageUrl: string;
}

export interface ProductoModelo {
  _id: any;
  categoryID: string;
  title: string;
  description: string;
  categorySex: string;
  imageUrl: string;
  inventario: InventarioModelo[];
  precio: number;
  codigo: string;
}

export class InventarioModelo {
  talla: string;
  inventario: number;
  constructor(any: any) {
    this.talla = any.talla;
    this.inventario = any.inventario;
  }
}

export interface ImagenModelo {
  nombreArchivo: string;
  base64textString: string;
}