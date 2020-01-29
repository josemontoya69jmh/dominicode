import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
// import { BookInterface } from '../../models/book';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { 

  }
  // OJO comprobar si es estatico o no
  // https://www.youtube.com/watch?v=AyuIaJTqBLs&t=568s
  @ViewChild('btnClose', { static: true}) btnClose: ElementRef;
// Con esto recuperamos la variable pasada al modal
  @Input() userUid: string;
  
  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      // le añade el userUid al objeto
      bookForm.value.userUid = this.userUid;
      // esto guarda el libro
      this.dataApi.addBook(bookForm.value);
    } else {
      // Update
      this.dataApi.updateBook(bookForm.value);
    }
    // Esto nos debe resetear el formulario
    bookForm.resetForm();
    // hacemos referencia a nuestro ViewChild
    this.btnClose.nativeElement.click();

  }

}