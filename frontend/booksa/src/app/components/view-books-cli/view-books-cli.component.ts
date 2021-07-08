import { Component, OnInit } from '@angular/core';
import Notificacion from 'src/app/interfaces/Notificacion';
import Book from 'src/app/interfaces/Book';
import { GlobalConstants } from 'src/app/servicios/global-constants';
import { RestService } from 'src/app/servicios/rest.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-books-cli',
  templateUrl: './view-books-cli.component.html',
  styleUrls: ['./view-books-cli.component.css']
})
export class ViewBooksCliComponent implements OnInit {

  ENDPOINT_SELECTED:string;
  notificacion: Notificacion;
  books: Book[] = [];

  constructor( private rest: RestService, private cookie: CookieService) { 
    this.notificacion = { activar: false }
    this.ENDPOINT_SELECTED = "";
  }

  ngOnInit(): void {
    this.ConfigureEndPoint();
    this.showBooks();
    this.books = []
  }

  ConfigureEndPoint(){
    this.ENDPOINT_SELECTED = this.cookie.get("hostname");
 }
  desactivarNotificacion() {
    this.notificacion.activar = false;
  }

  async showBooks(){
    try {
      let idUser= JSON.parse(sessionStorage.getItem("type_user")||'{}').id;
      
      //SE OBTIENE LA URL DEL LOS COOKIES
      let val =   await this.rest.GetReq(this.ENDPOINT_SELECTED+"orders/read").subscribe(
        (response) =>{
          // this.books=response.body.data
          //SE DEBE DE AGRUPAR LOS VALORES POR EL ID DEL CLIENTE. 
          let arr:[] = response.body;
          arr.forEach(element => {
            let obj = JSON.stringify(element)
            let js = JSON.parse(obj);
            //ACA SE SELECCIONA EL LIBRO COMPRADO POR EL ID DEL USUARIO
            if(idUser === js.id_cliente){
              let arrBook:[] = js.books;
              arrBook.forEach(book => {
                let objBook = JSON.stringify(book)
                let jsBook = JSON.parse(objBook);
                let newBook:Book = {};
                newBook.id = jsBook.id_libro;
                newBook._id = jsBook.id_libro;
                newBook.author = jsBook.autor;
                newBook.name = jsBook.nombre;
                newBook.categories = jsBook.generos;
                newBook.genres = jsBook.generos;
                newBook.editorial = jsBook.id_editorial;
                newBook.image = jsBook.foto;
                newBook.stock = jsBook.stock;
                newBook.price = jsBook.precio;
                this.books.push(newBook)
              });

            }
          });
        },
        (error) =>{
          console.log(error);
          alert('Problemas! --> '+ error.error.message)
        }
      );
    } catch (error) {
      alert('Problemas! --> '+ error.error.message)
    }
  }

}
