import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // en el constructor metemos el afAuth y el router, es decir todos los servicios
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  // Declaramos las variables
  // email = '';
  // password = '';

 public email = '';
  public password = '';
  ngOnInit() {
    // metemos la funcion dentro del OnInit para que se ejecute al cargarse la pagina
    this.getCurrentUser();
  }



  // para loguearse con email y contrasea
  onLoginEmailUser(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        // Si todo va bien nos mostrara por consola el objeto del usuario
        console.log('UsuarioOjeto', res);
        // Esto nos sirve para rediregir
        this.router.navigate(['admin/list-books']);
      }).catch(err => console.log('err', err.message));



  }

  // -----------------Con esta funcion nos logueamos con goooggle-----------------------------------------
  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
     .then((res) => {
       console.log('USUARIO', res );
       this.router.navigate(['admin/list-books']);
  })
     .catch (err => console.log('error', err));


  }


  // con esta funcion sabemos si el usuario esta logueado
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log(auth.email);

      } else {
        console.log('No esta logueado');
         }
    });
  }


  // onLogout() {
  //   console.log('hola estoy deslogueado');
  //   this.authService.logoutUser();
  // }
  // onLoginRedirect(): void {

  // }
}