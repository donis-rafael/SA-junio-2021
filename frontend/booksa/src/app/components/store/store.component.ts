import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Book from 'src/app/interfaces/Book';
import Notificacion from 'src/app/interfaces/Notificacion';
import { RestService } from 'src/app/servicios/rest.service';

const ENDPOINT_BOOKLIST = "books";
const ENDPOINT_GENRLIST = "categories";
const ENDPOINT_BOOKBYGEN = "books-by-category";
const ENDPOINT_BOOKBYEDI = "books-by-editorial_store";

const BOOKS = "book/read";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  // variable de nombre de libro
  bookeditorial: string;

  // libro actual
  currentBook: any;
  // notificaciones para html
  notificacion: Notificacion;
  // generos o categorias de las editoriales
  genres: any[];
  // lista de libros
  books: any[];
  user: any = {};

  // para controlar el modal
  @ViewChild('bookClose', { static: false }) bookClose!: ElementRef;

  constructor(public cookie: CookieService, private rest: RestService) {
    this.bookeditorial = "";
    this.notificacion = { activar: false }
    this.currentBook = {};
    this.genres = [ "1", "2" ];
    this.books = [
      { name: "Book1", description: "hola mundo", price: 1, isbn: "1111", image: "assets/img/tech/image2.jpg", genres:["1", "2", "3"] },
      { name: "Book1", description: "hola mundo", price: 1, isbn: "1111", image: "assets/img/tech/image2.jpg", genres:["1", "2", "3"] },
      { name: "Book1", description: "hola mundo", price: 1, isbn: "1111", image: "assets/img/tech/image2.jpg", genres:["1", "2", "3"] },
    ];
  }

  ngOnInit(): void {
    this.obtenerCart();
    this.obtenerLibros();
    // this.obtenerGeneros();
    this.obtenerUser();
  }

  obtenerUser() {
    let usr = sessionStorage.getItem('type_user');
    if (usr == null || usr == undefined) {
      return;
    }
    this.user = JSON.parse(usr);
  }

  /**
   * cambia el filtro de generos
   * @param i
   * @param value
   */
  changeCheck(i: number, value?: any) {
    if (value.checked) {
      this.buscarGenero(i);
    }
  }

  /**
   * busca libros por editorial
   */
  async buscarEditorial() {
    if (this.bookeditorial == "") {
      return;
    }

    try {
      let info = {
        editorial: this.bookeditorial
      };

      let res = await this.rest.PostRequest2(ENDPOINT_BOOKBYEDI, info).toPromise();
      // establecer lista
      let booklist: any[] = res.body.data;
      // transformar lista
      let newlist: any[] = booklist.map(book => {
        let nbook: any = {
          id: book._id,
          genres: book.categories,
          description: book.description,
          editorial: book.editorial,
          image: book.image,
          name: book.name,
          price: book.price,
          stock: book.stock,
        };
        return nbook;
      });

      // actualizar lista
      this.books = newlist;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * solo buscar por un genero - despues se debe de cambiar a por varios generos
   * @param i
   */
  async buscarGenero(i: number) {
    try {
      let res = null;
      if (i == 0) {
        res = await this.rest.GetRequest2(ENDPOINT_BOOKLIST).toPromise();
      } else {
        let info = {
          category: this.genres[i]
        };
        res = await this.rest.PostRequest2(ENDPOINT_BOOKBYGEN, info).toPromise();
      }
      // establecer lista
      let booklist: any[] = res.body.data;
      // transformar lista
      let newlist: any[] = booklist.map(book => {
        let nbook: any = {
          id: book._id,
          genres: book.categories,
          description: book.description,
          editorial: book.editorial,
          image: book.image,
          name: book.name,
          price: book.price,
          stock: book.stock,
        };
        return nbook;
      });

      // actualizar lista
      this.books = newlist;
    } catch (err) {
      console.log(err);
    }
    // filtrar
    //let genfiltro = this.genres.filter(genero => genero.check);
    // transformar
    //let ngeneros = genfiltro.map(genero => {return genero.name});
    //console.log(ngeneros);
  }

  /**
   * Obtiene los generos desde el servidor
   */
  async obtenerGeneros() {
    try {
      // obtener
      let res = await this.rest.GetRequest2(ENDPOINT_GENRLIST).toPromise();
      // establecer lista
      let categorylist: any[] = res.body.data;
      // transformar lista
      let newlist: any[] = categorylist.map(category => {
        return category;
      });
      // actualizar generos
      this.genres = newlist;
      this.genres.unshift("All");
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Obtiene los libros desde el servidor
   */
  async obtenerLibros() {
    try {
      let hostname = this.cookie.get("hostname");
      let url = hostname + BOOKS;

      // obtener
      // let res = await this.rest.GetRequest2(ENDPOINT_BOOKLIST).toPromise();
      let res = await this.rest.GetReq(url).toPromise();
      console.log(res);

      // establecer lista
      let booklist: any[] = res.body;
      // console.log(booklist);
      // transformar lista
      let newlist: any[] = booklist.map(book => {
        let nbook: any = {
          id_libro: book.id_libro,
          id_editorial: book.id_editorial,
          genres: book.generos,
          author: book.autor,
          editorial: book.editorial,
          image: book.foto,
          name: book.nombre,
          price: book.precio,
          stock: book.stock,
        };
        return nbook;
      });

      let listfilter: any[] = newlist.filter(x => x.stock > 0);

      // actualizar lista
      this.books = listfilter;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * busca la lista de carrito de compra
   */
  obtenerCart() {
    let cart = this.cookie.get('cart');
    // revisar si existe
    if (cart == undefined || cart == null || cart == "") {
      // agregar nueva lista
      this.cookie.set('cart', JSON.stringify([]));
    }
  }

  /**
   * actualiza el libro actual
   * @param i
   */
  changeCurrentBook(i: number) {
    this.currentBook = this.books[i];
  }

  /**
   * Agrega al carro de compra el libro actual
   */
  addCart() {
    // if (this.user == null || this.user == undefined) {
    //   this.notificacion = { activar: true, tipo: "warning", mensaje: "Se debe de registrar para agregar al carrito" }
    //   this.closeBookModal();
    //   return;
    // }
    // if (this.user.tipo != "4") {
    //   this.notificacion = { activar: true, tipo: "warning", mensaje: "Se debe de registrar para agregar al carrito" }
    //   this.closeBookModal();
    //   return;
    // }

    // obtener producto
    let cart: any[] = JSON.parse(this.cookie.get('cart'));
    // obtener los valores
    let product = {
      id_libro: this.currentBook.id_libro,
      id_editorial: this.currentBook.id_editorial,
      genres: this.currentBook.genres,
      author: this.currentBook.author,
      editorial: this.currentBook.editorial,
      image: this.currentBook.image,
      name: this.currentBook.name,
      price: this.currentBook.price,
      stock: this.currentBook.stock,
      quantity: 1
    }

    // informar
    this.notificacion = { activar: true, tipo: "info", mensaje: product.name + " se agrego al carro de compra" }
    cart.push(product);
    // cerrar el modal
    this.closeBookModal();
    // actualizar carrito
    this.cookie.set('cart', JSON.stringify(cart));
  }

  desactivarNotificacion() {
    this.notificacion.activar = false;
  }

  closeBookModal() {
    this.bookClose.nativeElement.click();
  }
}
