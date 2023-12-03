import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {
  showNotifyError,
  showSwalSuccess,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  loading = false;

  constructor(private _ls: LoginService) {}

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  register(): void {
    if (this.formRegister.valid) {
      this.loading = true;
      this._ls.singup(this.formRegister.value.email).subscribe(
        (res: any) => {
          this.loading = false;
          this.validateEmail(true);
        },
        (e) => {
          this.loading = false;
          showNotifyError('Error al registrar', 'Intente mas tarde');
        }
      );
    }
  }

  validateEmail(sendEmail = false): void {
    this.loading = true;
    this._ls.validateEmail(this.formRegister.value.email).subscribe(
      (res: any[]) => {
        this.loading = false;
        if (res.length === 1 && sendEmail) {
          let { email, _id } = res[0];
          this.sendEmail(email, _id.$oid);
          return;
        }
        if (res.length > 0) {
          showSwalWarning(
            'Correo existente',
            'Ya existe una cuenta con el correo ingresado'
          );
          return;
        }
        this.register();
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error al validar el email', 'Intente mas tarde');
      }
    );
  }

  sendEmail(email: string, id: string): void {
    this.loading = true;
    this._ls.sendValidateEmail(email, id).subscribe(
      (res: any) => {
        this.loading = false;
        showSwalSuccess(
          'Correo enviado',
          'Para continuar, ingrese al enlace que fue enviado a su correo electrónico'
        );
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error al enviar correo', 'Intente mas tarde');
        this.eliminarCorreo(id);
      }
    );
  }

  eliminarCorreo(ID: string) {
    this._ls.deleteClient(ID).subscribe();
  }
}
