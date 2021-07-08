import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/servicios/global-constants';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-check-compras',
  templateUrl: './check-compras.component.html',
  styleUrls: ['./check-compras.component.css']
})
export class CheckComprasComponent implements OnInit {
  estados: any[];
  notify: any;

  constructor(private rest: RestService, private cookie: CookieService) {
    this.estados = [];
    this.notify = { active: false };
  }

  ngOnInit(): void {
    this.getCompras();
  }

  async getCompras() {
    // obtener usuario
    let user = JSON.parse(sessionStorage.getItem("type_user")||'{}');
    console.log(user);

    // obtener host
    let hostname = this.cookie.get("hostname");
    let url = hostname + "orders/read";

    try {
      let res = await this.rest.GetReq(url).toPromise();
      let compras: any[] = res.body;
      console.log(compras);

      res = await this.rest.GetReq(GlobalConstants.server + "orders/states").toPromise();
      // res = await this.rest.GetReq("http://localhost:3000/" + "orders/estados").toPromise();
      let states: any[] = res.body.data;
      console.log(states);

      // recorrer las compras
      let nstates: any[] = [];
      for (const compra of compras) {
        for (const state of states) {
          if (compra.id_compra == state.id_compra && compra.id_cliente == user.id) {
            let etiquetaEstado = "";
            let bedge = "";
            if(state.estado == 1) {
              etiquetaEstado = "Verificacion de pago";
              bedge = "danger";
            }
            else if(state.estado == 2) {
              etiquetaEstado = "Traer de bodega";
              bedge = "warning";
            }
            else if(state.estado == 3) {
              etiquetaEstado = "Producto preparado";
              bedge = "warning";
            }
            else if(state.estado == 4) {
              etiquetaEstado = "Producto enviado";
              bedge = "success";
            }
            else if(state.estado == 5) {
              etiquetaEstado = "Producto entregado";
              bedge = "success";
            }
            else {
              etiquetaEstado = "Sin procesar";
              bedge = "light";
            }
            nstates.push({
              id_compra: compra.id_compra,
              id_cliente: compra.id_cliente,
              total: state.total,
              estado: state.estado,
              etiqueta: etiquetaEstado,
              badge: bedge
            });
            break;
          }
        }
      }

      this.estados = nstates;
    } catch (err) {
      console.log(err);
      alert(err.error.message || err.error.mensaje);
    }
  }

  async changeState(estado: any, noEstado: any) {

  }
}
