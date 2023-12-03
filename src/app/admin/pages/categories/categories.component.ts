import { Component, OnInit } from '@angular/core';
import { CategoryModelo } from 'src/app/productos/models/productos.modelo';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';
import { ModalCategoryComponent } from '../../components/modal-category/modal-category.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'categorySex',
    'options',
  ];
  objCategories!: CategoryModelo[];

  constructor(private _ps: ProductosService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.consultaInfo();
  }

  consultaInfo(): void {
    this._ps.getCategories().subscribe(
      (res: CategoryModelo[]) => {
        this.objCategories = res;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  getTypeSex(type: string): string {
    return type === 'man' ? 'Caballero' : 'Dama';
  }

  openModal(isNew: boolean, categoria?: CategoryModelo) {
    this.matDialog
      .open(ModalCategoryComponent, {
        panelClass: 'sinpadding',
        width: '500px',
        height: 'auto',
        data: {
          isNew,
          objCategory: categoria,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res)
          this.consultaInfo();
      });
  }

  deleteCategory(categoria: CategoryModelo) {
    showModalConfirmation(
      'Eliminar categoría',
      '¿Seguro que deseas eliminar esta categoría?'
    ).then((res) => {
      if (res) {
        this._ps.deleteCategory(categoria._id.$oid).subscribe(
          (res) => {
            showNotifySuccess('Categoría eliminado', 'La categoría se eliminó correctamente');
            this.consultaInfo();
          },
          (e) => {
            showNotifyError('Error al eliminar la categoría', 'Intente mas tarde');
          }
        );
      }
    });
  }
}
