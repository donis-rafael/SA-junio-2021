import { Component, OnInit} from '@angular/core';
import { RestService } from '../../../servicios/rest.service';
import * as _ from  'lodash';
import book from 'src/app/interfaces/Book';
import { GlobalConstants } from 'src/app/servicios/global-constants';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})

export class CreateBookComponent implements OnInit {
  ENDPOINT_SELECTED:string;

  public messageOk = false;
  public messageFail = false;
  public newCategory = "";
  public notifCategory = "";
  public generos:string[] = [];
  public selectedGeneros:string[] = [];
  public inputGeneros = ""
  public newBook:book = {}
  public libroCreado = false;
  imageError: string ="";
  isImageSaved: boolean = false;
  cardImageBase64: any = "";



  constructor(private rest: RestService,private cookie: CookieService) {
    this.newBook.categories = [] //se inicializa para que pueda registrar
    this.ENDPOINT_SELECTED = "";
  }

  ngOnInit(): void {
    this.ConfigureEndPoint();
    this.loadGenres();

  }

  ConfigureEndPoint(){
    this.ENDPOINT_SELECTED = this.cookie.get("hostname");
 }

  onChange(value:any) {
    this.newBook.categories?.push(value);
  }

  //ESTA FUNCION SOLO CREA UNA CATEGORIA EN EL DROPDOWN, Y NO AFECTA LA BASE DE DATOS
  async createCategory(){
    //verificando que el campo categoria no este vacio
    if(this.newCategory !== ""){
      //verificar si la categoria existe
      if(this.generos.includes(this.newCategory)){//la categoria existe
        this.messageOk = false;
        this.messageFail = true;
        this.notifCategory = "Genero existe"
      }else{ //NO EXISTE EL GENERO
        this.generos.push(this.newCategory)
        this.messageOk = true;
        this.messageFail = false;
        this.notifCategory = "Genero Creado"
      }
    }else{
      //bandera de no hay categoria
      this.messageOk = false;
      this.messageFail = true;
      this.notifCategory = "No Hay Categorias"
    }
  }

  resetFlags(){
      this.messageOk = false;
      this.messageFail = false;
      this.notifCategory = "";
      this.newCategory = "";
  }

  async createBook () {
    //SE OBTIENEN LAS CREDENCIALES DEL USUARIO ACTUAL.
    try {
      //primero se obtiene los datos del libro por la editoria
      let userData= JSON.parse(sessionStorage.getItem("type_user")||'{}');
      this.newBook.editorial = userData.id;

      // PARTE PARA CREAR UN NUEVO LIBRO

      //SE REGISTRA UN LIBRO CON LOS NUEVOS PARAMETROS. 
      let bookESB = {
        nombre:this.newBook.name, 
        generos: this.newBook.categories,
        stock: this.newBook.stock,
        autor: this.newBook.author,
        id_editorial: this.newBook.editorial,
        foto: this.newBook.image,
        precio: this.newBook.price
      }
      // console.log(bookESB);
      
      //SE ENVIA LA PETICION DEL NUEVO LIBRO. 
      let res = await this.rest.PostReq(this.ENDPOINT_SELECTED +"book/create",bookESB).toPromise();
      alert(res.body.message);

      // // guarda un log de registro
      // let info = {
      //   username: userData.nombre,
      //   email: userData.email,
      //   fecha: (new Date(Date.now())).toISOString(),
      //   mensaje: "Se creo el libro '" + this.newBook.name + "'"
      // };
      // await this.rest.PostReq(GlobalConstants.endpoint_log_save, info).toPromise();

      //resetaeamos valores
      this.newBook = {}
      this.newBook.image = "https://www.gravatar.com/avatar/1234566?size=200&d=mm"

    } catch (error) {
      console.log(error);
      alert('Problemas! --> '+ error.error.message)
    }
  }

  async loadGenres(){
    // let val =   await this.rest.GetRequest2('categories').subscribe(
    //   (response) =>{
    //     this.generos= response.body.data
    //   },
    //   (error) =>{
    //     console.log(error);
    //     alert('Problemas! --> '+ error.error.message)
    //   }
    // );

    //OBTENCION DE GENEROS
    let libs = await this.rest.GetReq(this.ENDPOINT_SELECTED + "book/read").subscribe(
      (response) =>{
        let arr:[] = response.body;
        arr.forEach(element => {
          let obj = JSON.stringify(element)
          let js = JSON.parse(obj);
          let arrGen:[] = js.generos;
          arrGen.forEach(gen => {
            if (this.generos.indexOf(gen) === -1 ){ //NO EXISTE, SI LO AGREGO
              this.generos.push(gen)
            }
          });
          
        });
        
      },
      (error) =>{
        console.log(error.error);
        alert('Problemas! --> '+ error.error.message)
      }
    );
  }
  /**
   * Funcion que obtienen los generos de la base de datos
   */
  getGeneros() {
    return this.generos
  }

  fileChangeEvent(fileInput: any){
    this.imageError = "";
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
              const loadedImage: any = rs.currentTarget;
                const img_height  = loadedImage.height ;//   currentTarget['height'];
                const img_width =  loadedImage.width//rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    let imgBase64Path = e.target.result;
                    this.isImageSaved = true;
                    //ACA SE PROCEDE A CONVETIR LA IMAGEN
                    this.compressImage(imgBase64Path,250,300).then(compressed=>{
                      this.cardImageBase64 = compressed;
                      this.newBook.image = this.cardImageBase64;
                      //REGISTRO LA IMAGEN EN BASE64

                    })
                }
                return null;
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
    return null;
  }


  compressImage(src:any, newX:any, newY:any) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx?.drawImage(img, 0, 0, newX, newY);
        const data = ctx?.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }

}
