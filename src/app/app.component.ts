import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationsService } from './shared/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app_bordados';

  // Clave publica de notificaciones
  public readonly VAPID_PUBLIC_KEY =
    'BAN5l7dvIHSrQfUEhwYeFeTUPc5mZ8tR2Xv3H2y7-ytI1vXh2hoGlj19PCVS06-1n4SJ8JW2_RTuMovcm6FO2Q8';

  constructor(private swPush: SwPush, private _ns: NotificationsService) {
    this.subscribeToNotifications();
  }

  // Función para suscribirse a las notificaciones
  subscribeToNotifications(): any {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        // Guarda la suscripción en una variable del servidor
        this._ns.subscribe(sub).subscribe((res) => {
          console.log(res);
        });
      })
      .catch((err) => console.log(err));
  }
}
