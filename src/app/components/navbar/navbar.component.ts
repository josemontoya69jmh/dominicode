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
  public appname = 'BookStore';
  public estalogueado = false;
  ngOnInit() {
    // lanzamos la aplicacion al abrir el navegador
    this.getCurrentUser();
  }
// con esta funcion obserbamos el estado del usuario
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.estalogueado = true;
      } else {
        console.log('NOT user logged');
        this.estalogueado = false;
      }
    });
  }

  onLogout() {
    this.afsAuth.auth.signOut();
  }


}