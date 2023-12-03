import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  token: string = '';
  constructor(private swPush: SwPush, private readonly http: HttpClient) {}

  sendNotification(token: any, payload: any) {
    let body = {
      token,
      payload,
    };
    const url = `${environment.urlEmail}/send-push-notification`;
    return this.http.post(url, body);
  }

  subscribe(token: any) {
    let body = {
      token,
    };
    const url = `${environment.urlEmail}/subscribe`;
    return this.http.post(url, body);
  }

  pushNotificationMasiva(payload: any) {
    let body = {
      payload,
    };
    const url = `${environment.urlEmail}/push-notification-masiva`;
    return this.http.post(url, body);
  }
}
