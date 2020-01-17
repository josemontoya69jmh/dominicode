import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
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
  public email: string = '';
  public password: string = '';


  ngOnInit() {
  }

  onLogin(): void {
    // this.authService.loginEmailUser(this.email, this.password)
    //   .then((res) => {
    //     this.onLoginRedirect();
    //   }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle() {
    // Con esta funcion nos logeamos y nos redirecciona, hay que meterlo por parametros en el constructor
    // esto nos levanta un popup
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // nos redirecciona
    this.router.navigate(['admin/list-books']);

  }


  onLogout() {
    console.log('hola estoy deslogueado');
    this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }
}