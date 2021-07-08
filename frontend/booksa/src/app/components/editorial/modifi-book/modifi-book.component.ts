import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../servicios/rest.service';
import { Router } from '@angular/router';
import * as _ from  'lodash';
import book from "../../../interfaces/Book"
import { GlobalConstants } from 'src/app/servicios/global-constants';

@Component({
  selector: 'app-modifi-book',
  templateUrl: './modifi-book.component.html',
  styleUrls: ['./modifi-book.component.css']
})
export class ModifiBookComponent implements OnInit {
  public messageOk = false;
  public messageFail = false;
  public newCategory = "";
  public notifCategory = "";
  public generos = [""];
  public newBook = [] as book;
  public libroCreado = false;
  imageError: string ="";
  isImageSaved: boolean = false;
  cardImageBase64: any = "";



  constructor(private rest: RestService, private route:Router) { }

  ngOnInit(): void {
    this.loadGenres();
    this.loadMetaDataBook();
  }

  onChange(value:any) {
    this.newBook.categories?.push(value);
  }

  async loadMetaDataBook(){
    let data  = JSON.parse(sessionStorage.getItem("modif-book")||'{}');

    if(Object.entries(data).length !== 0){  //SE VERIFICA QUE LA VARIABLE DE SESSION NO VENGA NULO.
      this.newBook = data
      // console.log(this.newBook);

    }else{
      alert("no se encontrado informacion con respecto al libro que dease modificar.")
    }
  }
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

  async loadGenres(){
    let val =   await this.rest.GetRequest2('books/getCategories').subscribe(
      (response) =>{
        this.generos= response.body.data

      },
      (error) =>{
        console.log(error);
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

  async modifyBook(){
    let dataBook:book = JSON.parse(sessionStorage.getItem("modif-book")||'{}'); //datos originales
    if(!(_.isEqual(this.newBook,dataBook))){ //NO SON IGUALES: SI HUBO CAMBIO
      let arrKeys = this.changedKeys(this.newBook,dataBook); //RETORNA  LOS ATRIBUTOS DE LOS LIBROS QUE CAMBIARON.
      let newData= {
        "idBook": dataBook._id,
        "name": this.newBook.name,
        "description":this.newBook.description,
        "editorial": dataBook.editorial,
        "price": this.newBook.price,
        "stock": this.newBook.stock,
        "categories": this.newBook.categories,
        "newImage":arrKeys.includes("image") ? true : false, // True si se envía una nueva imagen en base 64, False se envía la url de la imagen
        "image" : this.newBook.image
      }
      //SE ENVIAN LOS DATOS A MODIFICAR
      try {
        let res = await this.rest.PutRequest2("books",newData).toPromise();

        // guarda un log de registro
        let userData= JSON.parse(sessionStorage.getItem("type_user")||'{}');
        let info = {
          username: userData.nombre,
          email: userData.email,
          fecha: (new Date(Date.now())).toISOString(),
          mensaje: "Se edito el libro '" + newData.name + "'"
        };
        await this.rest.PostReq(GlobalConstants.endpoint_log_save, info).toPromise();

        alert(res.body.message)
        this.route.navigate(['/edit-book']);
      } catch (error) {
        alert('Problemas! --> '+ error.error.message)
      }

    }else{
      alert('No hubo cambio de Metadatos');
    }
  }

  changedKeys(obj1:any,obj2:any){
    var keys = _.union(_.keys(obj1),_.keys(obj2));
    return _.filter(keys, function(key){
      return obj1[key] !== obj2[key];
    })
  }

}
