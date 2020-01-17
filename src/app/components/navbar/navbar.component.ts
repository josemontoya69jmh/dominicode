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
    // lanzamos la aplicacion al abrir el navegador
    this.getCurrentUser();

  }


  // con esta funcion obserbamos el estado del usuario
  // mediante la funcio que importamos de nuestro servicio vemos si estamos logueados
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {

        this.estalogueado = true;
        console.log(this.estalogueado);

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