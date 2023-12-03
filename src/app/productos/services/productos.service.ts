import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  CategoryModelo,
  ImagenModelo,
  InventarioModelo,
  ProductoModelo,
} from '../models/productos.modelo';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private readonly http: HttpClient) {}

  getCategoryPerSex(category: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getCategoriesPerSex.php?categorySex=${category}`
    );
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.url}/products/getCategories.php`);
  }

  createCategory(formData: CategoryModelo, imageUrl: string): Observable<any> {
    let params = new HttpParams()
      .append('name', formData.name)
      .append('description', formData.description)
      .append('categorySex', formData.categorySex)
      .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/createCategory.php`, {
      params,
    });
  }

  updateCategory(
    id: string,
    formData: CategoryModelo,
    imageUrl: string
  ): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('name', formData.name)
      .append('description', formData.description)
      .append('categorySex', formData.categorySex)
      .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/updateCategory.php`, {
      params,
    });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/deleteCategory.php?id=${id}`
    );
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${environment.url}/products/getProduct.php?id=${id}`);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${environment.url}/products/getProducts.php`);
  }

  createProduct(
    formData: ProductoModelo,
    imageUrl: string,
    objTallas: InventarioModelo[]
  ): Observable<any> {
    let params = new HttpParams()
      .append('title', formData.title)
      .append('description', formData.description)
      .append('categoryID', formData.categoryID)
      .append('categorySex', formData.categorySex)
      .append('precio', formData.precio)
      .append('inventario', JSON.stringify(objTallas))
      .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/createProduct.php`, {
      params,
    });
  }

  updateProduct(
    id: string,
    formData: ProductoModelo,
    imageUrl: string,
    objTallas: InventarioModelo[]
  ): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('title', formData.title)
      .append('description', formData.description)
      .append('categoryID', formData.categoryID)
      .append('categorySex', formData.categorySex)
      .append('precio', formData.precio)
      .append('inventario', JSON.stringify(objTallas))
      .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/updateProduct.php`, {
      params,
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/deleteProduct.php?id=${id}`
    );
  }

  getProductsPerCategory(category: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getProductsPerCategory.php?id=${category}`
    );
  }

  getrCategory(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getCategory.php?id=${id}`
    );
  }

  uploadFile(archivo: ImagenModelo) {
    return this.http.post(
      `${environment.url}/products/uploadImage.php`,
      archivo
    );
  }

  findProduct(
    txtSearch: string,
    min: number,
    max: number,
    category: string,
    sex: string,
    talla: string
  ): Observable<any> {
    let params = new HttpParams()
      .append('txtSearch', txtSearch.toLowerCase())
      .append('categoryID', category ? category : '0')
      .append('categorySex', sex ? sex : '0')
      .append('talla', talla ? talla : '0')
      .append('min', min ? min : -1)
      .append('max', max ? max : -1);
    return this.http.get(`${environment.url}/products/findProduct.php`, {
      params,
    });
  }
}
