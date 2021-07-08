import { Component, OnInit } from '@angular/core';
import { RestService } from '../../servicios/rest.service';
import * as _ from  'lodash';
import book from 'src/app/interfaces/Book';
import { GlobalConstants } from 'src/app/servicios/global-constants';

@Component({
  selector: 'app-book-request-cli',
  templateUrl: './book-request-cli.component.html',
  styleUrls: ['./book-request-cli.component.css']
})
export class BookRequestCliComponent implements OnInit {
  newBook:book = {}
  isImageSaved?:boolean
  imageError = ""
  cardImageBase64: any = "";

  constructor(public rest:RestService) { 

    this.isImageSaved = false
  }
  ngOnInit(): void {
  }
  
  async newRequest(){
    // console.log(this.newBook);
    try {
      let res = await this.rest.PostReq(GlobalConstants.endpoint_postSolicitarBook, this.newBook).toPromise();
      alert(res.body.message)
      this.newBook = {}
      this.newBook.image = "../../../assets/img/avatars/b1358c2e97643376da222621124d6171.jpg"
      this.isImageSaved = false
    } catch (error) {
      console.log('Problemas! --> '+ error.error.message)
      
    }
  }

  fileChangeEvent(fileInput: any){
    this.imageError = ""
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

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
                      this.isImageSaved = true
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
