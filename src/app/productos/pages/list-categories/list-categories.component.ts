import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductosService } from '../../services/productos.service';
import { CategoryModelo, ProductoModelo } from '../../models/productos.modelo';
import { showNotifyError } from 'src/app/shared/functions/Utilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit {
  urlImage = environment.urlImg;
  objCategories!: CategoryModelo[];
  typeCat! : string | any;
  constructor(
    private readonly _router: Router,
    private _auth: AuthService,
    private activatedRouter: ActivatedRoute,
    private _ps: ProductosService
  ) {
    this.typeCat = this.activatedRouter.snapshot.paramMap.get('type');
    if (this.typeCat) this.consultaInfo(this.typeCat);
  }

  ngOnInit(): void {}

  viewListProducts(): void {
    if (this._auth.isAuth()) {
      this._router.navigate(['/home/list-categories']);
      return;
    }
    this._router.navigate(['home/login']);
  }

  consultaInfo(categorySex: string): void {
    this._ps.getCategoryPerSex(categorySex).subscribe(
      (res: CategoryModelo[]) => {
        this.objCategories = res;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  verCategoria(category: CategoryModelo) {
    this._router.navigate(['/home/list-categories/list-products/category'], {queryParams: {id:category._id.$oid}});
  }
}
