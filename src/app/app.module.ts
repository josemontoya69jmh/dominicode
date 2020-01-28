// MODULOS
// Estos son los que se instalan por defecto
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Este componente es imprescindible para trabajar con ngModule
import { FormsModule } from '@angular/forms';
// todas estas import para poder utilizar los metodos de firebase
// Primero hay que  npm install firebase @angular/fire -S
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireStorageModule } from '@angular/fire/storage';


// COMPONENTES
// Todo esto son los componentes
import { AppComponent } from './app.component';
import { ListBookComponent } from './components/admin/list-book/list-book.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterComponent } from './components/users/register/register.component';



// ---------------------OTROS-----------------------------------
// para las rutas
import { AppRoutingModule } from './app-routing.module';
// inyectamos el documento environment donde tenemos las Key de Firebase
import { environment } from '../environments/environment';

// Estos import son los que en provider  inyectamos a todos lo ts entre ellos al  login.component.ts
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    ListBookComponent,
    DetailsBookComponent,
    HeroComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    OffersComponent,
    LoginComponent,
    ProfileComponent,
    Page404Component,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
