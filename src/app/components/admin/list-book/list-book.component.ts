import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from '../../../models/book';
// import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
// Variable que la covertimos de tipo  de nuestro BookInterface
// y que utilizaremos en getListBooks() y en modificarBook
  books: BookInterface[];

  // Variables para poder recuperar al usuario logueado y ver su rol
  esAdmin: any = null;
  esEditor: any = null;
  // En esta variable metemos el id de nuestro usuario para luego comprobar si es el mismo que el del libro
  userUid: string = null;



  ngOnInit() {
    this.getListBooks();
    this.obtenerActualUsuario();
  }

  // comprobamos que tipo de rol que tiene
  obtenerActualUsuario() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        // rellenamos la variable con uid del usuario
        this.userUid = auth.uid;
        // llamamos a nuestro metodo del servicio y le pasamos el id del usuario para recibir el objeto
        this.authService.isUserAdmin(this.userUid).subscribe(ObjetoRecibido => {
          // una vez recogido el objeto rellenamos nuestras variables para usarlas en el html
          this.esAdmin = ObjetoRecibido.roles.admin;
          this.esEditor = ObjetoRecibido.roles.editor;

          console.log('admin', ObjetoRecibido.roles.admin, 'userUid', this.userUid);

          // this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');

          // this.isEditor = Object.assign({}, ObjetoRecibido.roles).hasOwnProperty('editor');

        });
      }
    });
  }


  getListBooks() {
    this.dataApi.getAllBooks()
      .subscribe(books => {
        this.books = books;

        console.log('books desde getlistBooks', books);
      });
  }

  onDeleteBook(idBook: string): void {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteBook(idBook);
    }
  }

  // Este metodo nos trae el objeto 
  modificarBook(book: BookInterface) {
    console.log('BOOK', book);
    this.dataApi.selectedBook = Object.assign({}, book);
  }








}
