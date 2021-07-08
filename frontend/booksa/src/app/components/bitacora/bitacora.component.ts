import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/servicios/global-constants';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  buscarEmail: string;
  borrarEmail: string;
  borrarTodo: boolean;
  logs: any;

  constructor(private rest: RestService) {
    this.buscarEmail = "";
    this.borrarEmail = "";
    this.borrarTodo = true;
  }

  ngOnInit(): void {
    this.getLog();
  }

  async getLog() {
    try {
      let res = await this.rest.GetReq(GlobalConstants.endpoint_log_all).toPromise();
      let list: [any] = res.body.data;
      let nlist = list.reverse();
      this.logs = nlist.map(x => {
        return { username: x.username, email: x.email, mensaje: x.mensaje, fecha: (new Date(x.fecha)).toLocaleDateString() + " " + (new Date(x.fecha)).toLocaleTimeString() }
      });
    }
    catch (err) {
      alert(err.error);
    }
  }

  limpiarTodo() {
    this.borrarTodo = true;
  }

  limpiarUser() {
    this.borrarTodo = false;
  }

  limpiar() {
    if (this.borrarTodo) {
      this.borrarPorTodo();
    } else {
      this.borrarPorUsuario();
    }
  }

  async buscar() {
    try {
      let res = await this.rest.PostReq(GlobalConstants.endpoint_log_search, { email: this.buscarEmail }).toPromise();
      let list: [any] = res.body.data;
      let nlist = list.reverse();
      this.logs = nlist.map(x => {
        return { username: x.username, email: x.email, mensaje: x.mensaje, fecha: (new Date(x.fecha)).toLocaleDateString() + " " + (new Date(x.fecha)).toLocaleTimeString() }
      });
    }
    catch (err) {
      alert(err.error);
    }
  }

  async borrarPorTodo() {
    try {
      let res = await this.rest.PostReq(GlobalConstants.endpoint_log_delete, {}).toPromise();
      this.getLog();
      alert(res.body.mensaje);
    } catch (err) {
      alert(err.error);
    }
  }

  async borrarPorUsuario() {
    try {
      let res = await this.rest.PostReq(GlobalConstants.endpoint_log_deleteByUser, { email: this.borrarEmail }).toPromise();
      this.getLog();
      alert(res.body.mensaje);
    } catch (err) {
      alert(err.error);
    }
  }
}
