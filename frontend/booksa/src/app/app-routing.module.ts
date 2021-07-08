import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import {LoginComponent} from './components/login/login.component'
import { CreateBookComponent } from './components/editorial/create-book/create-book.component';
import { ModifiBookComponent } from './components/editorial/modifi-book/modifi-book.component';
import { EditBookComponent } from './components/editorial/edit-book/edit-book.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { TaxesBookComponent } from './components/editorial/taxes-book/taxes-book.component';
import { BookRequestCliComponent } from './components/book-request-cli/book-request-cli.component';
import { BookRequestsEdiComponent } from './components/book-requests-edi/book-requests-edi.component';
import { OrdenAdminComponent } from './components/orden-admin/orden-admin.component';
import { ViewBooksCliComponent } from './components/view-books-cli/view-books-cli.component';
import { CheckComprasComponent } from './components/check-compras/check-compras.component';

const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"register", component: RegisterComponent },
  { path:"admin", component: AdminComponent },
  { path:"store", component: StoreComponent },
  { path:"shopping-cart", component: ShoppingCartComponent },
  { path:"login", component: LoginComponent },
  { path:"create-book", component: CreateBookComponent },
  { path:"modifi-book", component: ModifiBookComponent },
  { path:"edit-book", component: EditBookComponent },
  { path:"bitacora", component: BitacoraComponent },
  { path:"taxes-book", component: TaxesBookComponent },
  { path:"request-book", component: BookRequestCliComponent},
  { path:"requests-book", component: BookRequestsEdiComponent},
  { path:"orden-admin", component: OrdenAdminComponent},
  { path:"view-books-cli", component: ViewBooksCliComponent},
  { path:"check-orders", component: CheckComprasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
