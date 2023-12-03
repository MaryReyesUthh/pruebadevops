import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPwdComponent } from './login/forgot-pwd/forgot-pwd.component';
import { MisionVisionComponent } from './shared/mision-vision/mision-vision.component';
import { AvisoPrivacidadComponent } from './shared/aviso-privacidad/aviso-privacidad.component';
import { PreguntasFrecuentesComponent } from './shared/preguntas-frecuentes/preguntas-frecuentes.component';
import { RegisterProcessComponent } from './login/register-process/register-process.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { PedidosComponent } from './shared/pedidos/pedidos.component';
import { PageNoFoundComponent } from './shared/page-no-found/page-no-found.component';

const routes: Routes = [
  
  {
    path: 'home',
    data: { breadcrumb: 'Inicio' },
    loadChildren: () =>
      import('./pages/pages.module').then((mod) => mod.PagesModule),
  },
  {
    path: 'admin',
    data: { breadcrumb: 'Dashboard' },
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNoFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
