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

  // en el constructor metemos el afAuth y el router
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  // Declaramos las variables
  email = '';
  password = '';


  ngOnInit() {
    this.getCurrentUser();
  }
  // para loguearse con email y contrasea
  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password);
      // .then((res) => {
      //   this.onLoginRedirect();
      // }).catch(err => console.log('err', err.message));

    if (this.authService.loginEmailUser(this.email, this.password)) {
      this.onLoginRedirect();
    
    } else {
      
      console.log('err.message');
    }



  }


  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
    if (this.authService.loginGoogleUser()) {
      // redireccionamo si devuelve true, ojo con tener declarada el canActivate en app-routing-module.ts
      this.router.navigate(['user/profile']);
     
    } else {
     
      console.log('ha avido un Error')
    }
  }



  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.authService.estaslogueador = true;
      } else {
        console.log('NOT user logged');
        this.authService.estaslogueador = false;
      }
    });
  }


  // onLogout() {
  //   console.log('hola estoy deslogueado');
  //   this.authService.logoutUser();
  // }
  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }
}