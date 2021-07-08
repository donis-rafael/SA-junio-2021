import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {
  ENDPOINT_G1:string;
  ENDPOINT_G2:string;
  ENDPOINT_G3:string;
  ENDPOINT_G4:string;
  noGroup:string;

  constructor(private route:Router, private cookie: CookieService) {
        //CONFIGURANDO DIRECCIONES DE ENDPOINT
        this.noGroup="0";
        this.ENDPOINT_G1="http://35.230.87.64:4091/";
        this.ENDPOINT_G2="http://34.123.35.142:4091/";
        this.ENDPOINT_G3="http://35.222.108.70:4091/";
        this.ENDPOINT_G4="http://34.68.53.63:4091/";
  }
  ngOnInit(): void {
    let num = this.cookie.get("grupo");
    if (num==undefined || num==null) {
      this.cookie.set("grupo", "0");
    }
    this.noGroup=num;
    /** VARIABLE DE SESSION,
    *   Se pierde cuando el usuario cierra la pestania del navegador o el navegador
    *   TIPOS que se manejaran en este proyecto con la variable "tipo_usuario":
    *     * 1 : cliente no logueado
    *     * 2 : Administrador
    *     * 3 : Editorial
    *     * 4 : cliente logueado
    */
    if(sessionStorage.getItem('type_user') == null || sessionStorage.getItem('type_user') == undefined){
      sessionStorage.setItem("type_user",JSON.stringify({tipo:1,id:"",nombre:""}));
    }
    // sessionStorage.setItem("type_user",JSON.stringify({tipo:3,id:"60d4b1f774937b3880e39978",nombre:"BookSA"})); //para trabajar con editorial
    // console.log(JSON.parse(sessionStorage.getItem('type_user') ||'{}'));

  }

  Get_Tipo_Usuario(){
    // console.log(JSON.parse(sessionStorage.getItem("type_user")||'{}'));
    return JSON.parse(sessionStorage.getItem("type_user")||'{}').tipo;
  }

  Log_Out(){
    //SE DEGRADA LA SESSION A USUARIO NORMAL
    sessionStorage.setItem("type_user",JSON.stringify({tipo:1,id:"",nombre:""}));
    this.route.navigate(['']);
  }

  getUserName(){
    return JSON.parse(sessionStorage.getItem("type_user")||'{}').nombre;
  }

  changeESB(noGrupo: number) {
    let hostname: string = "";
    switch (noGrupo) {
      case 1:
        hostname = this.ENDPOINT_G1;
        this.noGroup = "1";
        break;
      case 2:
        hostname = this.ENDPOINT_G2;
        this.noGroup = "2";
        break;
      case 3:
        hostname = this.ENDPOINT_G3;
        this.noGroup = "3";
        break;
      default:
        hostname = this.ENDPOINT_G4;
        this.noGroup = "4";
        break;
    }
    this.cookie.set("hostname", hostname);
    this.cookie.set("grupo", this.noGroup);
    console.log(this.cookie.get("hostname"));
  }

  refreshDropDown(){

  }
}
