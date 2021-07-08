import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkEmailFormat() deberia de comprobar el formato de un correo', () => {
    let value = false;

    value = component.checkEmailFormat("invalido");
    expect(value).toBeFalsy();

    value = component.checkEmailFormat("valido@gmail.com");
    expect(value).toBeTruthy();
  });

  it('checkPasswordEmpty() deberia comprobar que el password no este vacio', ()=>{
    let value = false;
    value = component.checkPasswordEmpty("");
    expect(value).toBeTruthy(); //esperando que es cierto que no hay password

    value = component.checkPasswordEmpty("12345678");
    expect(value).toBeFalsy();
  });

  it('checkClient() Deberia verificar los datos del cliente',()=>{
    let value = false;
    //ciente vacio
    value = component.checkClient()
    expect(value).toBeFalse();

    //cliente con datos
    component.client.email = "prueba@gmail.com"
    component.client.password = "holamundo123"

    value = component.checkClient()
    expect(value).toBeTruthy();

  });
});
