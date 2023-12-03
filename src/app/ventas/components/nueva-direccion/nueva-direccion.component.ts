import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  showNotifyError,
  showNotifySuccess,
} from 'src/app/shared/functions/Utilities';
import { DireccionModelo } from '../../models/ventas.modelo';
import { VentasService } from '../../services/ventas.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nueva-direccion',
  templateUrl: './nueva-direccion.component.html',
  styleUrls: ['./nueva-direccion.component.scss'],
})
export class NuevaDireccionComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private matRef: MatDialogRef<NuevaDireccionComponent>,
    private _vs: VentasService,      
    private _auth: AuthService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      isNew: boolean;
      direccion: DireccionModelo;
    },
  ) {
    this.form = new FormGroup({
      clienteID: new FormControl(this._auth.token, []),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      estado: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      municipio: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      colonia: new FormControl('', [
        Validators.required,
      ]),
      calle: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', [Validators.required]),
      indicaciones: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    if (this.data.direccion) {
      this.id = this.data.direccion._id.$oid;
      this.form.controls['nombre'].setValue(this.data.direccion.nombre);
      this.form.controls['estado'].setValue(this.data.direccion.estado);
      this.form.controls['municipio'].setValue(this.data.direccion.municipio);
      this.form.controls['colonia'].setValue(this.data.direccion.colonia);
      this.form.controls['calle'].setValue(this.data.direccion.calle);
      this.form.controls['telefono'].setValue(this.data.direccion.telefono);
      this.form.controls['indicaciones'].setValue(this.data.direccion.indicaciones);
    }
  }

  submit() {
    this.data.isNew ? this.createClient() : this.updateClient();
    this.matRef.close(true);
  }

  updateClient(): void {
    this._vs.updateDireccion(this.id, this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Dirección actualizada',
          'La dirección se actualizó correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al actualizar', 'Intente mas tarde');
      }
    );
  }

  createClient(): void {
    this._vs.createdireccion(this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Dirección agregada',
          'La dirección se agregó correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al agregar dirección', 'Intente mas tarde');
      }
    );
  }
}
