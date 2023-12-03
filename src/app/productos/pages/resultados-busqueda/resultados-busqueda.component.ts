import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import {
  showNotifyError,
  showNotifyWarning,
} from '../../../shared/functions/Utilities';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModelo, ProductoModelo } from '../../models/productos.modelo';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss'],
})
export class ResultadosBusquedaComponent implements OnInit {
  urlImage = environment.urlImg;
  imageName = '';
  id!: string;
  txtSearch!: string;
  objProductos!: ProductoModelo[];
  objCategories!: CategoryModelo[];
  loading = false;
  min!: number;
  max!: number;
  categorySelectID!: string;
  sexSelect!: string;
  tallaSelect!: string;
  priceError = false;

  constructor(
    private _ps: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.setFiltros(res);
      }
    });
  }

  getCategories() {
    this.loading = true;
    this._ps.getCategories().subscribe(
      (res: CategoryModelo[]) => {
        this.objCategories = res;
        this.loading = false;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
        this.loading = false;
      }
    );
  }

  setFiltros(res: any) {
    this.txtSearch = res['search'];
    this.min = res['min'];
    this.max = res['max'];
    this.categorySelectID = res['categoryID'];
    this.sexSelect = res['categorySex'];
    this.tallaSelect = res['talla'];
    this.buscar();
  }

  validaFiltroPrecio() {
    if (this.min && this.max) {
      this.priceError = this.min > this.max;
      return;
    }
    this.priceError = false;
  }

  buscar(): void {
    this.loading = true;
    this._ps
      .findProduct(
        this.txtSearch,
        this.min,
        this.max,
        this.categorySelectID,
        this.sexSelect,
        this.tallaSelect
      )
      .subscribe(
        (res: ProductoModelo[]) => {
          this.objProductos = res;
          this.loading = false;
        },
        (e) => {
          showNotifyError('Error al buscar', 'Intente mas tarde');
          this.loading = false;
        }
      );
  }

  getCategory(id: string): string {
    if (this.objCategories && this.objCategories.length > 0) {
      let category = this.objCategories.find(
        (category) => category._id.$oid === id
      );
      return category ? category.name : '';
    }
    return '';
  }

  aplicaFiltros(campo?: string) {
    if (campo) {
      switch (campo) {
        case 'sexSelect':
          this.sexSelect = '0';
          break;
        case 'categorySelectID':
          this.categorySelectID = '0';
          break;
        case 'tallaSelect':
          this.tallaSelect = '0';
          break;
      }
    }
    this.router.navigate([], {
      queryParams: {
        search: this.txtSearch,
        min: this.min,
        max: this.max,
        categoryID: this.categorySelectID,
        categorySex: this.sexSelect,
        talla: this.tallaSelect,
      },
    });
  }

  verProducto(producto: ProductoModelo) {
    this.router.navigate(['/home/list-categories/product-detail'], {queryParams: {ID : producto._id.$oid}});
  }
}
