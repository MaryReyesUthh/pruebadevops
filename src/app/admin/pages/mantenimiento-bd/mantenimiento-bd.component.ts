import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { DumpModel, RestoreModel } from 'src/app/login/models/cliente.modelo';
import { LoginService } from 'src/app/login/services/login.service';
import {
  showModalConfirmation,
  showNotifyError,
  showNotifySuccess,
  showSwalSuccess,
} from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-mantenimiento-bd',
  templateUrl: './mantenimiento-bd.component.html',
  styleUrls: ['./mantenimiento-bd.component.scss'],
})
export class MantenimientoBdComponent implements OnInit {
  loadingDump = false;
  loadingRestore = false;
  objRestores!: RestoreModel[];
  objDumps!: DumpModel[];
  dumpDisp!: DumpModel;
  displayedColumns: string[] = ['position', 'date', 'status'];
  constructor(private _ls: LoginService) {}

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    combineLatest(this._ls.getDumps(), this._ls.getRestores()).subscribe(
      (res) => {
        this.objDumps = res[0];
        this.objRestores = res[1];
        this.dumpDisp = this.objDumps[this.objDumps.length - 1];
      },
      (err) => {
        showNotifyError('Error al consultar registros', 'Intente mas tarde');
      }
    );
  }

  createBackup() {
    showModalConfirmation(
      'Crear copia de seguridad',
      '¿Seguro que deseas crear una copia de seguridad?'
    ).then((res) => {
      if (res) {
        this.loadingDump = true;
        this._ls.createBackup().subscribe(
          (res) => {
            this.loadingDump = false;
            showSwalSuccess(
              'Copia de seguridad creada',
              'Su copia se seguridad fue creada exitosamente'
            );
            this.registrarDump();
          },
          (err) => {
            this.loadingDump = false;
            showNotifyError(
              'Error al restaurar copia de seguridad',
              'No se pudo restaurar la copia de seguridad'
            );
          }
        );
      }
    });
  }

  registrarDump() {
    this._ls.setDateDumps().subscribe((res) => {
      this.getInfo();
    });
  }

  restoreDB() {
    showModalConfirmation(
      'Restaurar base de datos',
      '¿Seguro que deseas restaurar la última copia de seguridad?'
    ).then((res) => {
      if (res) {
        this.loadingRestore = true;
        this._ls.restoreDB().subscribe(
          (res) => {
            this.loadingRestore = false;
            showSwalSuccess(
              'Copia de seguridad restaurada',
              'Su copia se seguridad fue restaurada exitosamente'
            );
            this.registrarRestauracion();
          },
          (err) => {
            this.loadingRestore = false;
            showNotifyError(
              'Error al crear copia de seguridad',
              'No se pudo crear la copia de seguridad'
            );
          }
        );
      }
    });
  }

  registrarRestauracion() {
    this._ls.setDateRestore().subscribe((res) => {
      this.getInfo();
    });
  }
}
