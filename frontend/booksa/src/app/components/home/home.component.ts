import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // if(sessionStorage.getItem('type_user') == null){
    //   sessionStorage.setItem("type_user",JSON.stringify({tipo:0,id:"",nombre:""}));
    // }
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

}
