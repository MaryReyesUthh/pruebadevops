import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ClienteModelo } from '../models/cliente.modelo';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(`${environment.url}/users/read.php`);
  }

  createClient(formData: ClienteModelo): Observable<any> {
    let params = new HttpParams()
    .append('name', formData.name)
    .append('email', formData.email)
    .append('password', formData.password)
    .append('isAdmin', formData.isAdmin)
    return this.http.get(`${environment.url}/users/createClient.php`, {
      params,
    });
  }

  updateClient(id: string, formData: ClienteModelo): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('name', formData.name)
      .append('email', formData.email)
      .append('password', formData.password)
      .append('isAdmin', formData.isAdmin);
    return this.http.get(`${environment.url}/users/updateClient.php`, {
      params,
    });
  }

  deleteClient(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/users/deleteClient.php?id=${id}`
    );
  }

  validateEmail(email: string): Observable<any> {
    return this.http.get(
      `${environment.url}/users/read_single.php?email=${email}`
    );
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${environment.url}/users/getUser.php?id=${id}`);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.url}/users/login.php?email=${email}&password=${password}`;
    return this.http.get(url);
  }

  singupAll(id: string, name: string, password: string): Observable<any> {
    const url = `${environment.url}/users/singupAll.php?id=${id}&name=${name}&password=${password}`;
    return this.http.get(url);
  }

  singup(email: string): Observable<any> {
    const url = `${environment.url}/users/create.php?email=${email}`;
    return this.http.get(url);
  }

  updatePwd(id: string, password: string): Observable<any> {
    const url = `${environment.url}/users/update_password.php?id=${id}&password=${password}`;
    return this.http.get(url);
  }

  sendValidateEmail(email: string, id: string): Observable<any> {
    let body = {
      email,
      id,
    };
    const url = `${environment.urlEmail}/send-validate-email`;
    return this.http.post(url, body);
  }

  sendForgotEmail(email: string, id: string): Observable<any> {
    let body = {
      email,
      id,
    };
    const url = `${environment.urlEmail}/send-forgot-password`;
    return this.http.post(url, body);
  }

  createBackup(): Observable<any> {
    const url = `${environment.url}/config/createBackup.php`;
    return this.http.get(url);
  }

  restoreDB(): Observable<any> {
    const url = `${environment.url}/config/restoreDB.php`;
    return this.http.get(url);
  }

  setDateDumps(): Observable<any> {
    const url = `${environment.url}/mongotools/setDateDump.php?date=${new Date()}`;
    return this.http.get(url);
  }

  setDateRestore(): Observable<any> {
    const url = `${environment.url}/mongotools/setDateRestore.php?date=${new Date()}`;
    return this.http.get(url);
  }

  getDumps(): Observable<any> {
    const url = `${environment.url}/mongotools/getDumps.php?`;
    return this.http.get(url);
  }

  getRestores(): Observable<any> {
    const url = `${environment.url}/mongotools/getRestores.php?`;
    return this.http.get(url);
  }

  getFeedbacks(): Observable<any> {
    const url = `${environment.url}/users/getFeedbacks.php`;
    return this.http.get(url);
  }
}
