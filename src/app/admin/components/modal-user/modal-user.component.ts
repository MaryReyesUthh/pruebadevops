import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteModelo } from 'src/app/login/models/cliente.modelo';
import { LoginService } from 'src/app/login/services/login.service';
import {
  showNotifyError,
  showNotifySuccess,
} from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {

  form!: FormGroup;
  id!: string;

  constructor(
    private matRef: MatDialogRef<ModalUserComponent>,
    private _ls: LoginService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objCliente: ClienteModelo;
      isNew: boolean;
    }
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    if (this.data.objCliente) {
      this.id = this.data.objCliente._id.$oid;
      this.form.controls['name'].setValue(this.data.objCliente.name);
      this.form.controls['email'].setValue(
        this.data.objCliente.email
      );
      this.form.controls['password'].setValue(
        this.data.objCliente.password
      );
      this.form.controls['isAdmin'].setValue(
        this.data.objCliente.isAdmin
      );
    }
  }

  submit() {
    this.data.isNew ? this.createClient() : this.updateClient();
    this.matRef.close(true);
  }

  updateClient(): void {
    this._ls.updateClient(this.id, this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Cliente actualizado',
          'El cliente fue actualizado correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al actualizar', 'Intente mas tarde');
      }
    );
  }

  createClient(): void {
    this._ls.createClient(this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Cliente creado',
          'El cliente fue creado correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al crear cliente', 'Intente mas tarde');
      }
    );
  }

}
