import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
  public appname = 'Montoya';
  public estalogueado = false;

  ngOnInit() {
    // lanzamos la aplicacion al abrir el navegador y miramos si esta logueado
    this.getCurrentUser();

  }


  // con esta funcion obserbamos el estado del usuario
  // mediante la funcion que importamos de nuestro servicio vemos si estamos logueado
  // y rellenamos la variable estalogueado
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {

        this.estalogueado = true;
        console.log('Usuario logueado');

      } else {
        console.log('NOT user logged');
        this.estalogueado = false;
      }
    });
  }
  // esta funcion nos desloga
  onLogout() {
    this.afsAuth.auth.signOut();
  }

}