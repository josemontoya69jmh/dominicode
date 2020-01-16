import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
appname = 'Montoya';
// esto nos sirve para saber cuando estamos logueados
public estalogeado = false ;
  constructor() {

   }
  ngOnInit() {

  }

}
