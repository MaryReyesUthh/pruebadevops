import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { RegisterProcessComponent } from './register-process/register-process.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPwdComponent,
    RegisterProcessComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgotPwdComponent,
    RegisterProcessComponent,
    ResetPasswordComponent
  ]
})
export class LoginModule { }
