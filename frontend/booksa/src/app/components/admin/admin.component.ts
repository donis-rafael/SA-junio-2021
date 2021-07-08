import { Component, OnInit } from '@angular/core';
import User from 'src/app/interfaces/User';
import Notificacion from 'src/app/interfaces/Notificacion';
import { RestService } from 'src/app/servicios/rest.service';
import { GlobalConstants } from 'src/app/servicios/global-constants';

// ENDPOINTS
const ENDPOINT_USERS = "auth/getUsers";
const ENDPOINT_DELETE = "auth/delete";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  requests: User[];
  users: User[];
  notify: Notificacion;

  constructor(private rest: RestService) {
    this.requests = [
      { id: "0", type: "3", name: "Jhonatan Lopez", email: "losajhonny@gmail.com", location: "Guatemala" },
      { id: "1", type: "3", name: "Felipe Davila", email: "fedav12@gmail.com", location: "Guatemala" },
    ];
    this.users = [
      { id: "0", type: "4", name: "Jhonatan", lastname: "Lopez", password: "123", phone: "48752121", email: "losajhonny@gmail.com" },
      { id: "1", type: "4", name: "Felipe", lastname: "Davila", password: "123", phone: "20356524", email: "fedav12@gmail.com" },
    ];
    this.notify = { activar: false };
  }

  ngOnInit(): void {
    this.getUsers();
  }

  desactivarNotify() {
    this.notify.activar = false;
  }

  /**
   * Obtener usuarios
   */
  async getUsers() {
    try {
      // obtener usuarios
      let res = await this.rest.GetRequest(ENDPOINT_USERS).toPromise();
      let userList: any[] = res.body.data;
      // convertir usuarios al esquema
      let newList: User[] = userList.map((usr) => {
        let type = (usr.type === "3")? 'Editorial': 'Cliente';

        let userTmp: User = {
          id: usr._id,
          type: type,
          accepted: usr.accepted,
          name: usr.name,
          lastname: usr.lastname,
          email: usr.email,
          password: usr.password,
          phone: usr.phone,
          location: usr.location,
        };

        return userTmp;
      });

      // obtener solicitud
      this.requests = newList.filter(x => x.accepted === "false");

      // obtener usuarios
      this.users = newList.filter(x => x.accepted !== "false");
    }catch (err) {
      this.notify = { activar: true, tipo: "danger", mensaje: err.message };
    }
  }

  /**
   * Obtener solicitud
   * @param i
   * @returns
   */
  getRequest(i: number) {
    return this.requests[i];
  }

  /**
   * Obtener usuario
   * @param i
   * @returns
   */
  getUser(i: number) {
    return this.users[i];
  }

  /**
   * aceptar usuario
   * @param i
   */
  async accept(i: number) {
    let request = this.getRequest(i);

    let params = {
      _id: request.id,
      accepted: true
    };

    try {
      let res = await this.rest.PostReq(GlobalConstants.endpoint_accept, params).toPromise();
      this.notify = { activar: true, tipo: "success", mensaje: res.body.message };
      // actualizar usuarios
      this.getUsers();
    } catch (err) {
      this.notify = { activar: true, tipo: "danger", mensaje: err.error.message };
    }
  }

  /**
   * rechazar usuario y elimina usuario
   * @param i
   */
  async deny(i: number) {
    let request = this.getRequest(i);

    let params = {
      _id: request.id,
    };

    await this.deleteUser(params);
  }

  /**
   * eliminar usuario
   * @param i
   */
  async delete(i: number) {
    let user = this.getUser(i);

    let params = {
      _id: user.id
    };

    await this.deleteUser(params);
  }

  /**
   * elimina un usuario
   * @param info
   */
  async deleteUser(params: any) {
    try{
      let res = await this.rest.PostRequest(ENDPOINT_DELETE, params).toPromise();
      this.notify = { activar: true, tipo: "success", mensaje: res.body.message };
      // actualizar usuarios
      this.getUsers();
    } catch (err) {
      this.notify = { activar: true, tipo: "danger", mensaje: err.error.message };
    }
  }

  /**
   * editar usuario
   * (pendiente)
   * @param i
   */
  edit(i: number) {
    let user = this.getUser(i);

    console.log(i);
  }

  /**
   * desactiva notify
   */
  quitNotify() {
    this.notify.activar = false;
  }
}
