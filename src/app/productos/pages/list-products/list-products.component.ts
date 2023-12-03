import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { showNotifyError } from 'src/app/shared/functions/Utilities';
import { CategoryModelo, ProductoModelo } from '../../models/productos.modelo';
import { combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  urlImage = environment.urlImg;
  objCategory!: CategoryModelo;
  objProducts!: ProductoModelo[];
  constructor(
    private activatedRouter: ActivatedRoute,
    private _ps: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((res) => {
      if (res) {
        this.consultaInfo(res['id']);
      }
    });
  }

  consultaInfo(id: string): void {
    combineLatest(
      this._ps.getrCategory(id),
      this._ps.getProductsPerCategory(id)
    ).subscribe(
      (res) => {
        this.objCategory = res[0][0];
        this.objProducts = res[1];
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  verProducto(producto: ProductoModelo) {
    this.router.navigate(['/home/list-categories/product-detail'], {queryParams: {ID : producto._id.$oid}});
  }
}
