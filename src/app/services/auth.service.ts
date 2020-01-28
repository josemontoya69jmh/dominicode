import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  // En las funciones del servicio hay que poner RETURN
  // Esta funcion es para REGISTRARNOS con email y password

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {

      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            // Aqui pasamos el objeto user que nos devuelve la funcion a nuestro metodo de crear usuarios
            this.crearUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }







  // registerUser(email: string, pass: string) {
  //   return new Promise((resolve, reject) => {
  //     this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
  //       .then(userData => resolve(userData),
  //       err => reject(err));
  //   });
  // }





  // Esta funcion es para LOGUEARNOS con Email y Contraseña
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  // loginFacebookUser() {
  //   return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
  //     .then(credential => this.updateUserData(credential.user))
  // }

  // LOGUEARNOS con esta funcion con GOOGLE
  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    // Para google cogemos el ojeto y se lo pasamos al metodo crearUserData

      .then(objetorecibido => this.crearUserData(objetorecibido.user));
  }

  // esta funcion es para DESLOGUEARSE
  logoutUser() {
    return this.afsAuth.auth.signOut();
  }
  // esto nos pregunta si el usuario esta registrado
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  //  onLogout() {
  //     this.afsAuth.auth.signOut();
  //   }





  // Este metodo nos crea un registro en Firebase con los datos del usuario entre ellos el rol
  crearUserData(user) {
    console.log('USER', user);
    // ususarios es el nombre que le hemos puesto a nuestra coleccion de firebase
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: false,
        admin: false
      }
    };
    return userRef.set(data, { merge: true });
    
  }

// Este metodo nos recupera el registro usuarios del usuario en cuestion
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`usuarios/${userUid}`).valueChanges();
  }


}








