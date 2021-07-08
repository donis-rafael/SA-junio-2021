import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/servicios/rest.service';
import { GlobalConstants } from 'src/app/servicios/global-constants';

@Component({
  selector: 'app-taxes-book',
  templateUrl: './taxes-book.component.html',
  styleUrls: ['./taxes-book.component.css']
})
export class TaxesBookComponent implements OnInit {
  // notificaciones para html
  taxBook = {"price":0, "pais":"","calc":"0","tax":0}
  paises:string[]
  calc = {
    precio:0,
    pais:""
  }
  // constructor( private rest: RestService) {
  constructor(public rest:RestService) {
    this.paises = []
   }

  ngOnInit(): void {
    this.llenarPaises();
  }

  // desactivarNotificacion() {
  //   this.notificacion.activar = false;
  // }

  async llenarPaises(){
    console.log('Estoy en taxes book');
      let val =   await this.rest.GetReq(GlobalConstants.endpoint_getCountries).subscribe(
        (response) =>{
          this.paises= response.body.paises
        },
        (error) =>{
          console.log(error);
          alert('Problemas! --> '+ error.error.message)
        }
      );
  }

  async calcImpuesto(){
    try {
      let tax = {"precio":this.taxBook.price,"pais":this.taxBook.pais}
      let res = await this.rest.PostReq(GlobalConstants.endpoint_postCalcularImpuesto, tax).toPromise();
      console.log(res.body);
      this.taxBook.tax = res.body.porcentaje;
      this.taxBook.calc = res.body.calculo;
    } catch (error) {
      alert('Problemas! --> '+ error.error.message)
    }

  }

  hayPaises(){
    if (this.paises.length != 0){
      console.log(this.paises);
      
      return true;
    }
    return false;
  }
    
  async hayImpuestoCalculado(pais:string,precio:number){
    try {
      let tax = {"precio":precio,"pais":pais}
      let res = await this.rest.PostReq(GlobalConstants.endpoint_postCalcularImpuesto, tax).toPromise();
      console.log(res.body);
      return true;
    } catch (error) {
      console.log('Problemas! --> '+ error.error.message)
      
    }
    return false
  }

}
