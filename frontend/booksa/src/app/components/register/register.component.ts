import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Notificacion from 'src/app/interfaces/Notificacion';
import User from 'src/app/interfaces/User';
import { RestService } from 'src/app/servicios/rest.service';

// ENDPOINTS
const ENDPOINT = "auth/register";
const REGISTER = "auth/registro"; // Enpoint Register Fase3

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // usuarios de la app
  editorial: User;
  cliente: User;
  // password de validacion
  passValidarCliente: string;
  passValidarEditorial: string;
  // notificacion
  notify: Notificacion;

  tipoEdit: string = "3";
  tipoCli: string = "4";

  constructor(private rest: RestService, private router: Router, private cookie: CookieService) {
    this.editorial = { type: this.tipoEdit, name: "", lastname: " ", email: "", password: "", phone: " ", location: "" }
    this.cliente = { type: this.tipoCli, name: "", lastname: "", email: "", password: "", phone: " ", location: " " }
    this.passValidarCliente = "";
    this.passValidarEditorial = "";
    this.notify = { activar: false }
  }

  ngOnInit(): void {
  }

  /**
   * Revisa si el valor esta vacio
   * @param value
   * @returns
   */
  isEmpty(value: any) {
    return value == undefined || value == "";
  }

  /**
   * Revisa si el valor es un numero
   * @param value
   * @returns
   */
  isNumber(value: any) {
    return Number.isInteger(value);
  }

  /**
   * Revisa el formato del email
   * @param value
   * @returns
   */
  checkEmailFormat(value: any) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
  }

  /**
   * Revisa si el password esta confirmado
   * @param password
   * @param confirmacion
   * @returns
   */
  checkPassword(password: any, confirmacion: any) {
    return password === confirmacion
  }

  /**
   * Revisa si los datos estan correctos del cliente
   * @returns
   */
  checkCliente() {
    if (this.isEmpty(this.cliente.name) || this.isEmpty(this.cliente.lastname)
      || this.isEmpty(this.cliente.email) || this.isEmpty(this.cliente.password)) {
      this.notify = { activar: true, tipo: "danger", mensaje: "Debe de llenar todos los campos" }
      return false;
    }
    if (!this.checkEmailFormat(this.cliente.email)) {
      this.notify = { activar: true, tipo: "danger", mensaje: "Ingrese su correo en un formato correcto" }
      return false;
    }
    if (!this.checkPassword(this.cliente.password, this.passValidarCliente)) {
      this.notify = { activar: true, tipo: "danger", mensaje: "Su contraseña de confirmacion no es correcta" }
      return false;
    }
    return true;
  }

  /**
   * Revisa si los datos estan correctos del editorial
   * @returns
   */
  checkEditorial() {
    if (this.isEmpty(this.editorial.name) || this.isEmpty(this.editorial.location)
      || this.isEmpty(this.editorial.email) || this.isEmpty(this.editorial.password)) {
      this.notify = { activar: true, tipo: "danger", mensaje: "Debe de llenar todos los campos" }
      return false;
    }
    if (!this.checkEmailFormat(this.editorial.email)) {
      this.notify = { activar: true, tipo: "danger", mensaje: "Ingrese su correo en un formato correcto" }
      return false;
    }
    if (!this.checkPassword(this.editorial.password, this.passValidarEditorial)) {
      this.notify = { activar: true, tipo: "danger", mensaje: "Su contraseña de confirmacion no es correcta" }
      return false;
    }
    return true;
  }

  /**
   * Envia la solicitud del cliente y se redirige a login
   * @returns
   */
  async signUpcliente() {
    if (!this.checkCliente()) {
      return;
    }

    let info = {
      nombre: this.cliente.name,
      apellido: this.cliente.lastname,
      correo: this.cliente.email,
      pwd: this.cliente.password,
      telefono: this.cliente.phone
    };

    try {
      let hostname = this.cookie.get("hostname");
      let url = hostname + REGISTER;
      let res = await this.rest.PutReq(url, info).toPromise();
      this.notify = { activar: true, tipo: "success", mensaje: res.body.message }
    } catch (error) {
      console.log(error);
      this.notify = { activar: true, tipo: "danger", mensaje: error.error.message }
    }
    // this.cliente.accepted = true;
    // let user = await this.register(this.cliente);
    // if (user != null) {
    //   this.router.navigate(['login']);
    // }
  }

  /**
   * Envia solicitud
   * @returns
   */
  async signUpEditorial() {
    if (!this.checkEditorial()) {
      return;
    }
    this.editorial.accepted = false;
    await this.register(this.editorial);
    this.editorial = { type: this.tipoEdit, name: "", lastname: " ", email: "", password: "", phone: "0", location: "" }
    this.passValidarEditorial = "";
    this.notify = { activar: true, tipo: "info", mensaje: "Solicitud enviada" };
  }

  /**
   * Comunicacion con el servidor para registrar usuario
   * @param user
   * @returns
   */
  async register(user: any) {
    try {
      let info = {
        "id": "",
        "type": user.type,
        "name": user.name,
        "accepted": user.accepted,
        "lastname": user.lastname,
        "email": user.email,
        "password": user.password,
        "phone": user.phone,
        "location": user.location
      };
      let res = await this.rest.PostRequest(ENDPOINT, info).toPromise();
      return res;

    } catch (err) {
      console.log(err);
      this.notify = { activar: true, tipo: "danger", mensaje: err.error.message }
      return null;
    }
  }

  /**
   * Desactiva la notificacion
   */
  quitNotify() {
    this.notify.activar = false;
  }

  /**
   * redirigir pagina principal
   */
  irPrincipal() {
    this.router.navigate(['/']);
  }
}
