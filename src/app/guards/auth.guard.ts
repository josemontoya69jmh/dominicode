// En realidad es todo un Copia Pega pero OJO Cambiar ruta abajo
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afsAuth: AngularFireAuth, private router: Router) { }
  // Este es el metodo que llamamos desde app-routing.module.ts

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return this.afsAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if (!auth) {
          // OJO  aqui debemos de poner la ruta que queremos que vaya sino esta logueado
          this.router.navigate(['/user/login']);
        }
      }));
  }

}