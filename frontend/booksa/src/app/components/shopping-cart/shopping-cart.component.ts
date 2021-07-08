import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/servicios/global-constants';
import { RestService } from 'src/app/servicios/rest.service';
import Notificacion from '../../interfaces/Notificacion';

const ENDPOINT_ENVORDEN = "orders/create";
const BOOKS = "book/read";
const COMPRAR = "orders/buy";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  // lista de libros en el carro
  books: any[];
  // info de tarjeta
  tarjetaCredito: any;

  notify: Notificacion;
  user: any = {};

  constructor(private cookie: CookieService, private rest: RestService) {
    this.notify = { activar: false }
    this.books = [];
    this.tarjetaCredito = {
      titular: "",
      numero: "",
      fechaExp: { mm: "", yy: "" },
      cvc: ""
    }
  }

  ngOnInit(): void {
    this.obtenerCart();
    this.obtenerUser();
  }

  obtenerUser() {
    let usr = sessionStorage.getItem('type_user');
    if (usr == null || usr == undefined) {
      return;
    }
    this.user = JSON.parse(usr);
    // console.log(this.user);
  }

  /**
   * Retorna la lista de libros del carro de compra
   * @returns
   */
  obtenerCart() {
    let cart = this.cookie.get("cart");

    if (cart) {
      this.books = JSON.parse(this.cookie.get("cart"));
      // console.log(this.books)
      return;
    }
    this.books = [];
  }

  /**
   * Retorna el precio total del carro de compra
   * @returns
   */
  getTotal() {
    let total = 0;
    for (const book of this.books) {
      total += book.price * book.quantity;
    }
    return total;
  }

  /**
   * Elimina el libro del carro
   * @param i
   */
  deleteBook(i: number) {
    this.books.splice(i, 1);
    this.updateCart();
  }

  /**
   * Actualiza el carro
   */
  updateCart() {
    this.cookie.set("cart", JSON.stringify(this.books));
  }

  /**
   * Enviar orden
   */
  async enviarOrden() {
    // verificar si existen en el stock
    let hostname = this.cookie.get("hostname");
    let url = hostname + BOOKS;
    let res = await this.rest.GetReq(url).toPromise();
    console.log(res);

    for (const book of this.books) {
      let libros: any[] = res.body;
      // console.log(book);
      for (const libro of libros) {
        if (book.id_libro == libro.id_libro && libro.stock < book.quantity) {
          this.notify = { activar: true, tipo: "danger", mensaje: "El libro '" + book.name + "' no cumple con la demanda" };
          return;
        }
      }
    }

    // if (this.tarjetaCredito.titular === "" || this.tarjetaCredito.numero === "" || this.tarjetaCredito.fechaExp.mm === ""
    //   || this.tarjetaCredito.fechaExp.yy === "" || this.tarjetaCredito.fechaExp.cvc === "") {
    //   this.notify = { activar: true, tipo: "danger", mensaje: "Llene todos los campos" };
    //   return;
    // }

    // cambio de formato
    let nbook = this.books.map(x => {
      return {
        id_libro: x.id_libro,
        nombre: x.name,
        generos: x.genres,
        stock: x.stock,
        autor: x.author,
        id_editorial: x.id_editorial,
        foto: x.image,
        precio: x.price,
        cantidad: x.quantity
      };
    });

    // falta obtener usuario
    let info = {
      id_cliente: this.user.id,
      // id_cliente: "60de91939ea2f45a1407b2c8",
      books: nbook,
      total: this.getTotal(),
      email: this.user.email,
      direccion: this.tarjetaCredito.titular
    }

    console.log(info);
    let id_compra = "";
    url = hostname + COMPRAR;

    try {
      let res = await this.rest.PostReq(url, info).toPromise();
      //   await this.rest.PostRequest(ENDPOINT_ENVORDEN, info).toPromise();
      this.notify = { activar: true, tipo: "success", mensaje: res.body.message };
      id_compra = res.body.id_compra;
      console.log(res);

      // vaciar carrito
      this.books = [];
      this.updateCart();
    } catch (err) {
      console.log(err);
      if (err.error.mensaje) {
        this.notify = { activar: true, tipo: "danger", mensaje: err.error.mensaje };
      }
      else {
        this.notify = { activar: true, tipo: "danger", mensaje: err.error.message };
      }
    }

    try {
      // registrar estado
      res = await this.rest.PostReq(GlobalConstants.server + "orders/newState", {
      // res = await this.rest.PostReq("http://localhost:3000/" + "orders/registrar-estado", {
        "id_compra": id_compra,
        "total": info.total,
        "estado": "0"
      }).toPromise();
      console.log(res);

    } catch (err) {
      console.log(err);
      if (err.error.mensaje) {
        this.notify = { activar: true, tipo: "danger", mensaje: err.error.mensaje };
      }
      else {
        this.notify = { activar: true, tipo: "danger", mensaje: err.error.message };
      }
    }
  }

  desactivarNotify() {
    this.notify.activar = false;
  }
}
