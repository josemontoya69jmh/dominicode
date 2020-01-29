import { Injectable } from '@angular/core';

// IMPORTANTE IMPORTAR TODO ESTO PARA PODER HACER CRUD CON FIREBASE
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BookInterface } from '../models/book';
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  // booksCollection es una variable que llenamos con las propiedades de nuestra interface
  private booksCollection: AngularFirestoreCollection<BookInterface>;

  books: Observable<BookInterface[]>;
  // esta variable es para poder manipular los documentos y es gracias AngularFirestoreDocument
  // Nos hace falta para eliminar y editar, pero no para agregar ni mostrar los item
  private bookDoc: AngularFirestoreDocument<BookInterface>;

  book: Observable<BookInterface>;
  // private Usuario: Observable<UserInterface>;


  
  public selectedBook: BookInterface = {
    id: null
  };


  constructor(private afs: AngularFirestore) {


  }


  // OBTENER todos los ITEMS
  getAllBooks() {
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }


  getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref => ref.where('oferta', '==', '1'));
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  // OBTENER un ITEMS en concreto
  // esto va a la coleccion de libros y coge el libro con el id que le pasamos
  getOneBook(idBook: string) {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
  // Añadir Items
  addBook(book: BookInterface): void {
    this.booksCollection.add(book);
  }
  // Modificar
  updateBook(book: BookInterface): void {
    // let idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${book.id}`);
    this.bookDoc.update(book);
  }
  // Borrar
  deleteBook(idBook: string): void {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  }








}
