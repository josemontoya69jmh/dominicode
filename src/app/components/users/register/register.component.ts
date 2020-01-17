import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  // @ViewChild('imageUser') inputImageUser: ElementRef;

  public email = '';
  public password = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }
  onAddUser() {
    this.authService.registerUser(this.email, this.password)
    if (this.authService.registerUser(this.email, this.password)) {
      console.log(this.authService.registerUser(this.email, this.password));
    }else{
console.log(this.authService.registerUser(this.email, this.password));

    };

  };
  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
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