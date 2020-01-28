import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }

  inputImageUser: ElementRef;

  public email = '';
  public password = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  
  //  Esto es para subir las imagenes
  onUpload(e) {
    console.log('OjetoImagen', e);
    // console.log('subir', e.target.files[0]);
    // Esto es un string aleatorio
    const id = Math.random().toString(36).substring(2);
    // En esta constante hemos cogido el archivo
    const file = e.target.files[0];
    // En esta creamos la ruta
    const filePath = `imagenes/imagen${id}`;
    // En esta la referencia para firebase
    const ref = this.storage.ref(filePath);
    // esta es la que sube el fichero
    const task = this.storage.upload(filePath, file);
   // esta es la barra del progreso
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  // Añadir usuario mediante email y password

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.router.navigate(['admin/list-books']);
        console.log('UsuarioOjeto', res);
      }

      ).catch(err => console.log('error', err)
      );
  }



  // Añadir usuario mediante email y password

  // onAddUser() {
  //   this.authService.registerUser(this.email, this.password)
  //     .then((res) => {
  //       this.authService.isAuth().subscribe(user => {
  //         if (user) {
  //           user.updateProfile({
  //             displayName: '',
  //             photoURL: this.inputImageUser.nativeElement.value
  //           }).then(() => {
  //             this.router.navigate(['admin/list-books']);
  //           }).catch((error) => console.log('error', error));
  //         }
  //       });
  //     }).catch(err => console.log('err', err.message));
  // }




  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        console.log('objetodegoogle', res);
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }
  // onLoginFacebook(): void {
  //   this.authService.loginFacebookUser()
  //     .then((res) => {
  //       this.onLoginRedirect();
  //     }).catch(err => console.log('err', err.message));
  // }

  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

}
















