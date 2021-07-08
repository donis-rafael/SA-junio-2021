import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { StoreComponent } from './components/store/store.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { EditBookComponent } from './components/editorial/edit-book/edit-book.component';
import { ModifiBookComponent } from './components/editorial/modifi-book/modifi-book.component';
import { CreateBookComponent } from './components/editorial/create-book/create-book.component';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { RestService } from './servicios/rest.service';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { BookRequestCliComponent } from './components/book-request-cli/book-request-cli.component';
import { BookRequestsEdiComponent } from './components/book-requests-edi/book-requests-edi.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaxesBookComponent } from './components/editorial/taxes-book/taxes-book.component';
import { ViewBooksCliComponent } from './components/view-books-cli/view-books-cli.component';
import { OrdenAdminComponent } from './components/orden-admin/orden-admin.component';
import { CheckComprasComponent } from './components/check-compras/check-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    StoreComponent,
    ShoppingCartComponent,
    CreateBookComponent,
    ModifiBookComponent,
    EditBookComponent,
    BitacoraComponent,
    BookRequestCliComponent,
    BookRequestsEdiComponent,
    TaxesBookComponent,
    ViewBooksCliComponent,
    OrdenAdminComponent,
    CheckComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    RestService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
