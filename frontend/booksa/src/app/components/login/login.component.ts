import { Component, OnInit } from '@angular/core';
import User from 'src/app/interfaces/User';
import { RestService } from './../../servicios/rest.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public datos = {"email":"", "password":""}
  client: User;
  ENDPOINT_SELECTED:string;

  constructor(private rest: RestService,private route:Router,private cookie: CookieService) {
    this.client = {  }
    this.ENDPOINT_SELECTED = "";
  }

  ngOnInit(): void {
    this.ConfigureEndPoint();
  }

 ConfigureEndPoint(){
    this.ENDPOINT_SELECTED = this.cookie.get("hostname");
 }

  async  verificar(){
    try {
      //TRADUCIENDO A ESB
      let datosESB = {
        email: this.datos.email,
        passwd: this.datos.password
      }
      //***************** */
      let res = await this.rest.PostReq(this.ENDPOINT_SELECTED+"auth/login",datosESB).toPromise();
      // let res = await this.rest.PostRequest("auth/login",this.datos).toPromise();
      let type = parseInt(res.body.data.tipo);
      if( type === 2){ //ADMINISTRADOR
        //REGISTRANDO LA VARIABLE DE SESSION
       sessionStorage.setItem("type_user",JSON.stringify({tipo:type,id:res.body.data.id,nombre:res.body.data.nombre,email:datosESB.email})); //Cliente admin
        this.route.navigate(['/admin']);

      } else if( type === 3){ // EDITORIAL
        // if ( res.body.data.accepted === "true"){ //CUENTA HACEPTADA
          sessionStorage.setItem("type_user",JSON.stringify({tipo:type,id:res.body.data.id,nombre:res.body.data.nombre,email:datosESB.email})); //Cliente admin
          this.route.navigate(['/create-book']);
        // }else{
        //   alert('Su cuenta no ha sido aprobada por un administrador de BOOKSA')
        // }

      }else if( type === 4){ //CLIENTE LOGEADO
        //REGISTRANDO LA VARIABLE DE SESSION
       sessionStorage.setItem("type_user",JSON.stringify({tipo:type,id:res.body.data.id,nombre:res.body.data.nombre,email:datosESB.email})); //Cliente admin
        this.route.navigate(['']);

      }else{ //USUARIO NO LOGUEADO
        this.route.navigate(['']);
      }

    } catch (error) {
      console.log(error.error.message);
      alert(error.error.message);
    }
  }


  // METODOS QUE ME AYUDAN A LAS PRUEBAS UNITARIAS
  checkEmailFormat(value: any) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
  }
 
  checkPasswordEmpty(value: any){
    return value == undefined || value == ""
  }

  checkClient(){
    if(!this.checkEmailFormat(this.client.email)){ //verificando el email
      return false;
    }

    if(this.checkPasswordEmpty(this.client.password)){ //verificando pasword
      return false
    }
    return true;
  }


}
