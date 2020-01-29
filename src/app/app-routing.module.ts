
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Se importan todos los componentes de nuestro proyectov
import { HomeComponent} from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';
import { ListBookComponent } from './components/admin/list-book/list-book.component';
import { LoginComponent } from 'src/app/components/users/login/login.component';
import { RegisterComponent } from 'src/app/components/users/register/register.component';
import { ProfileComponent } from 'src/app/components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
// 
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // El orden IMPORTA esta es la primera que quiero que se vea
  { path: '', component: HomeComponent },
  // canActive es el metodo que creamos en auth.guard.ts para prohibir la entrada a
  // los no logueados
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
  { path: 'bookdetalle/:id', component: DetailsBookComponent },
  { path: 'admin/list-books', component: ListBookComponent, canActivate: [AuthGuard] },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
