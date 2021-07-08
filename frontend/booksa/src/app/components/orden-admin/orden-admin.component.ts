import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/servicios/global-constants';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-orden-admin',
  templateUrl: './orden-admin.component.html',
  styleUrls: ['./orden-admin.component.css']
})
export class OrdenAdminComponent implements OnInit {
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
          if (compra.id_compra == state.id_compra) {
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
    console.log(estado);
    console.log(noEstado);

    try {
      await this.rest.PostReq(GlobalConstants.server + "orders/updateState", { id_compra: estado.id_compra, estado: noEstado }).toPromise();
      this.getCompras();

      switch(noEstado) {
        case 1:
          this.notify = { active: true, badge: "Verificacion de pago", type: "danger", message: "El pago ha sido verificado." }
          break;
        case 2:
          this.notify = { active: true, badge: "Traer de bodega", type: "warning", message: "Los productos estan en la tienda." }
          break;
        case 3:
          this.notify = { active: true, badge: "Producto preparado", type: "warning", message: "Los productos estan empacados." }
          break;
        case 4:
          this.notify = { active: true, badge: "Producto enviado", type: "success", message: "La orden esta en camino." }
          break;
        default:
          this.notify = { active: true, badge: "Producto entregado", type: "success", message: "La orden ha sido entregado." }
          break;
      }

    } catch (err) {
      console.log(err);
    }
  }
}
