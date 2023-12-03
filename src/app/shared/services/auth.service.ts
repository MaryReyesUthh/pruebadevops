import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';
  constructor() {
    let id = this.getTokenLocalStorage();
    this.token = id ? id : '';
  }

  getTokenLocalStorage() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  setTokenLocalStorage(token: string) {
    return localStorage.setItem('token', token);
  }

  setIsAdminLS(value: string) {
    return localStorage.setItem('isAdmin', value);
  }

  getIsAdminLS() {
    return localStorage.getItem('isAdmin');
  }

  isAuth(): boolean {
    let token = this.getTokenLocalStorage();
    if (token && token?.length > 0) {
      this.token = token;
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    let isAdmin = this.getIsAdminLS();
    if (isAdmin && isAdmin === 'true') {
      return true;
    }
    return false;
  }

  logout() {
    return localStorage.removeItem('token');
  }
}
