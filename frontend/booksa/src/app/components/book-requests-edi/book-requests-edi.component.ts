import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from 'src/app/servicios/rest.service';
import Notificacion from 'src/app/interfaces/Notificacion';
import Book from 'src/app/interfaces/Book';
import { GlobalConstants } from 'src/app/servicios/global-constants';

@Component({
  selector: 'app-book-requests-edi',
  templateUrl: './book-requests-edi.component.html',
  styleUrls: ['./book-requests-edi.component.css']
})
export class BookRequestsEdiComponent implements OnInit {

  notificacion: Notificacion;
  books: Book[];
  newBook:Book;
  public generos:string[];
  public newCategory = "";
  public messageOk = false;
  public messageFail = false;
  public notifCategory = "";

  paises = ["pais1","pais2"]

  constructor(private cookie:CookieService, private rest: RestService) {
    this.notificacion = { activar: false }
    this.books = []
    this.newBook = {}
    this.generos = []
  }

  ngOnInit(): void {
    this.showBooks();
    this.loadGenres();
  }
  async createCategory(){
    //verificando que el campo categoria no este vacio
    if(this.newCategory !== ""){
      //verificar si la categoria existe
      if(this.generos.includes(this.newCategory)){//la categoria existe
        this.messageOk = false;
        this.messageFail = true;
        this.notifCategory = "Genero existe"
      }else{ //NO EXISTE EL GENERO
        this.generos.push(this.newCategory)
        this.messageOk = true;
        this.messageFail = false;
        this.notifCategory = "Genero Creado"
      }
    }else{
      //bandera de no hay categoria
      this.messageOk = false;
      this.messageFail = true;
      this.notifCategory = "No Hay Categorias"
    }
  }
  async loadGenres(){
    let val =   await this.rest.GetRequest2('categories').subscribe(
      (response) =>{
        console.log('Cargando las categorias');
      console.log(response.body.data);

        this.generos= response.body.data
      },
      (error) =>{
        console.log(error);
        alert('Problemas! --> '+ error.error.message)
      }
    );
  }

  getGeneros() {
    return this.generos
  }

  onChange(value:any) {
    this.newBook.categories?.push(value);
  }

  selectedBook(libro:any){
    this.newBook = libro;
  }

  resetFlags(){
    this.messageOk = false;
    this.messageFail = false;
    this.notifCategory = "";
    this.newCategory = "";
} 

  desactivarNotificacion() {
    this.notificacion.activar = false;
  }

  async showBooks(){
    try {
      let val =   await this.rest.GetReq(GlobalConstants.endpoint_getRequestsBooks).subscribe(
        (response) =>{
          this.books=response.body.data
          // console.log(response.body.data);

        },
        (error) =>{
          console.log(error);
          alert('Problemas! --> '+ error.error.message)
        }
      );
      //primero se obtiene los datos del libro por la editoria
      // let userData= JSON.parse(sessionStorage.getItem("type_user")||'{}');
      //se envia el identificador de la editorial para solicitar todos sus libros.
      // let params = { editorial: userData.nombre }
      // let res = await this.rest.PostRequest2("books-by-editorial", params).toPromise();
      // this.books = res.body.data;
      // let bk:Book = {}
      // bk.image = "https://www.gravatar.com/avatar/1234566?size=200&d=mm"
      // bk.name = "libroPureba"
      // bk.author = "autorPrueba"
      // bk.published = "12//06/2021"
      // for(let i=0;i<4;i++){
      //   this.books.push(bk)
      // }
    } catch (error) {
      alert('Problemas! --> '+ error.error.message)
    }
  }

  async createBook(){
    try {
      //primero se obtiene los datos del libro por la editoria
      let userData= JSON.parse(sessionStorage.getItem("type_user")||'{}');
      this.newBook.editorial = userData.nombre;
      // console.log(this.newBook);
      let newBook2 = 
        {
          "name": this.newBook.name,
          "author": this.newBook.author,
          "published": this.newBook.published,
          "description":this.newBook.description,
          "editorial": this.newBook.editorial,
          "price": Number(this.newBook.price),
          "stock": Number(this.newBook.stock),
          "categories": this.newBook.categories,
          "image": this.newBook.image
      }
      // console.log(newBook2);
      let res = await this.rest.PostRequest2("books",newBook2).toPromise();
      // console.log(res.body.message);
      
      let info = {
        username: userData.nombre,
        email: userData.email,
        fecha: (new Date(Date.now())).toISOString(),
        mensaje: "Se acepto el libro '" + this.newBook.name + "'"
      };
      await this.rest.PostReq(GlobalConstants.endpoint_log_save, info).toPromise();
      
      let del = await this.rest.PostReq(GlobalConstants.endpoint_postDeleteBookRequest,{"idRequest":this.newBook._id}).toPromise();
      /**
       * guarda un log de registro cuando se acepta la solicitud del cliente
       */
      //resetaeamos valores
      this.newBook = {}
      alert(res.body.message + " \n"+  del.body.message);
      this.showBooks();
      this.loadGenres();
    } catch (error) {
      console.log(error);
      alert('Problemas! --> '+ error.error.message)
    }
  }

  // hayLibros(){
  //   if()
  // }

}
