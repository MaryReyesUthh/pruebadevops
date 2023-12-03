import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  showNotifyError,
  showNotifySuccess,
  showNotifyWarning,
} from 'src/app/shared/functions/Utilities';
import { LoginService } from '../services/login.service';
import { ClienteModelo } from '../models/cliente.modelo';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  clear: boolean = false;
  clearConfirm: boolean = false;
  objCliente!: ClienteModelo;
  pwdsCoinciden = false;
  pwdsValue = false;
  loading = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private _ls: LoginService,
    private readonly _router: Router
  ) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,}')]),
      password2: new FormControl('', [Validators.required]),
    });
    this.activatedRouter.queryParams.subscribe((param) => {
      let id: string = param['id'];
      if (!id) {
        showNotifyError('Acceso denegado', 'Ruta no válida');
        this._router.navigate(['/home']);
        return;
      }
      this.consultaInfo(id);
    });
  }

  ngOnInit(): void {}

  consultaInfo(id: string): void {
    this.loading = true;
    this._ls.getUsuario(id).subscribe(
      (res: ClienteModelo[]) => {
        this.loading = false;
        if (!res[0]._id) {
          showNotifyError('Acceso denegado', 'Ruta no válida');
          this._router.navigate(['/home']);
          return;
        }
        this.objCliente = res[0];
        console.log(this.objCliente);
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error al consultar información', 'Intente mas tarde');
      }
    );
  }

  restablecer(): void {
    if (this.form.valid && this.pwdsCoinciden) {
      this.loading = true;
      let id: string = this.objCliente._id.$oid;
      this._ls
        .updatePwd(id, this.form.value.password)
        .subscribe(
          (res) => {
            this.loading = false;
            showNotifySuccess('Contraseña actualizada', '¡Su contraseña se actualizó correctamente!');
            this._router.navigate(['/home/login']);
          },
          (e) => {
            this.loading = false;
            showNotifyError('Error al restablecer contraseña', 'Intente mas tarde');
          }
        );
      return;
    }
    showNotifyWarning(
      'Datos incompletos',
      'Complete los datos del formulario para continuar'
    );
  }

  validaPwds(): void {
    console.log(this.form.value.password);
    if (this.form.value.password && this.form.value.password2) {
      this.pwdsValue = true;
      this.pwdsCoinciden =
        this.form.value.password === this.form.value.password2;
      return;
    }
    this.pwdsCoinciden = false;
    this.pwdsValue = false;
    console.log(this.pwdsCoinciden);
  }

}
