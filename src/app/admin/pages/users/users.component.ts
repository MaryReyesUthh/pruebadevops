import { Component, OnInit } from '@angular/core';
import { CategoryModelo } from 'src/app/productos/models/productos.modelo';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModelo } from 'src/app/login/models/cliente.modelo';
import { LoginService } from 'src/app/login/services/login.service';
import { ModalUserComponent } from '../../components/modal-user/modal-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'isAdmin',
    'options',
  ];
  objUsers!: ClienteModelo[];

  constructor(private _ls: LoginService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.consultaInfo();
  }

  consultaInfo(): void {
    this._ls.getUsuarios().subscribe(
      (res: ClienteModelo[]) => {
        this.objUsers = res;
      },
      (e) => {
        showNotifyError('Error consultar información', 'Intente mas tarde');
      }
    );
  }

  openModal(isNew: boolean, categoria?: CategoryModelo) {
    this.matDialog
      .open(ModalUserComponent, {
        panelClass: 'sinpadding',
        width: '500px',
        height: 'auto',
        data: {
          isNew,
          objCliente: categoria,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.consultaInfo();
      });
  }

  deleteClient(category: CategoryModelo) {
    showModalConfirmation(
      'Eliminar cliente',
      '¿Seguro que deseas eliminar este cliente?'
    ).then((res) => {
      if (res) {
        this._ls.deleteClient(category._id.$oid).subscribe(
          (res) => {
            showNotifySuccess('Cliente eliminado', 'El cliente se eliminó correctamente');
            this.consultaInfo();
          },
          (e) => {
            showNotifyError('Error al eliminar cliente', 'Intente mas tarde');
          }
        );
      }
    });
  }
}
