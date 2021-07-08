import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../servicios/rest.service';
import { Router } from '@angular/router';
import book from "../../../interfaces/Book"
import { hostViewClassName } from '@angular/compiler';
import { GlobalConstants } from 'src/app/servicios/global-constants';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  ENDPOINT_SELECTED:string;
  public books = [] as book[]; //arreglo de libros
  public selectedBook = {} as book;  //libro seleccionado para luego eliminarlo
  constructor(private rest: RestService,private route:Router,private cookie: CookieService) {
    this.ENDPOINT_SELECTED = "";
   }

  ngOnInit(): void {
    this.ConfigureEndPoint();
    this.showBooks()
  }

  ConfigureEndPoint(){
    this.ENDPOINT_SELECTED = this.cookie.get("hostname");
 }

  modificarLibro(item:any){ //item conteniene los datos del libro

    let datos:book = item;
    //OBTENIENDO DATOS DEL USUARIO ACTUAL
    let userData= JSON.parse(sessionStorage.getItem("type_user")||'{}');
    datos.editorial = userData.nombre; //aca debe ir ID de la editorial por el momento se deja con nombre de la editorial
    //GUARDANDO UNA VARIABLE DE SESSION CON LOS DATOS PARA MODIFICAR EL LIBRO
    sessionStorage.setItem("modif-book",JSON.stringify(datos));
    //REDIRIGIENDO A LA PAGINA PAR AMODIFICAR EL LIBRO.
    this.route.navigate(['modifi-book']);
  }

  deleteBook(item:any){ //item conteniene los datos del libro
    this.selectedBook = item;
  }

  async confirmDelBook(){
    try {

      let parametro = {"idBook":this.selectedBook._id}
      let res = await this.rest.PostRequest2("books/delete",parametro).toPromise();
      this.showBooks();

      // guarda un log de registro
      let userData= JSON.parse(sessionStorage.getItem("type_user")||'{}');
      let info = {
        username: userData.nombre,
        email: userData.email,
        fecha: (new Date(Date.now())).toISOString(),
        mensaje: "Se elimino el libro '" + this.selectedBook.name + "'"
      };
      await this.rest.PostReq(GlobalConstants.endpoint_log_save, info).toPromise();

      alert(res.body.message)
    } catch (error) {
      alert('Problemas! --> '+ error.error.message)
    }
  }

  /**
   * Funcion que carga todos los libros en la vista del cliente.
   */
  async showBooks(){
    try {
      let idUser= JSON.parse(sessionStorage.getItem("type_user")||'{}').id;
      //SE OBTIENE LA URL DEL LOS COOKIES
      let val =   await this.rest.GetReq(this.ENDPOINT_SELECTED+"book/read").subscribe(
        (response) =>{
          let arr:[] = response.body;
          
          arr.forEach(element => {
            let obj = JSON.stringify(element)
            let js = JSON.parse(obj);
            let newBook:book = {}
            //ACA SE SELECCIONA EL LIBRO COMPRADO POR EL ID DEL USUARI
            // console.log(js.id_editorial);
            
            if(idUser.toString() === js.id_editorial.toString()){
              
              
              newBook.id = js.id_libro;
              newBook._id = js.id_libro;
              newBook.author = js.autor;
              newBook.name = js.nombre;
              newBook.categories = js.generos;
              newBook.genres = js.generos;
              newBook.editorial = js.id_editorial;
              newBook.image = js.foto;
              newBook.stock = js.stock;
              newBook.price = js.precio;
              this.books.push(newBook)
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
