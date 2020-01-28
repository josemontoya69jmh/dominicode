import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../models/book';
// Esto es para poder coger la id que se nos pasa por la url
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }

  // objeto vacio
  public book: BookInterface = {};

  ngOnInit() {
    // cuando se inicialize esta ventana recogera el id y se lo manda a getDetails
    const idBook = this.route.snapshot.params['id'];
    this.getDetails(idBook);
  }
// aqui recogemos la id se lo mandamos a el metodo que tenemos en nuestro servicio
// y rellenamos el objeto book
  getDetails(idBook: string): void {
    this.dataApi.getOneBook(idBook).subscribe(book => {
      this.book = book;
    });
  }

}