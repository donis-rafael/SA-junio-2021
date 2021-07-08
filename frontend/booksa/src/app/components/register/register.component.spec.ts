import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia comprobar si un valor esta vacio', () => {
    let value = false;

    value = component.isEmpty(undefined);
    expect(value).toBeTruthy();

    value = component.isEmpty("");
    expect(value).toBeTruthy();

    value = component.isEmpty("undefined");
    expect(value).toBeFalsy();
  });

  it('Deberia de comprobar si el correo tiene formato valido', () => {
    let value = false;

    value = component.checkEmailFormat("invalido");
    expect(value).toBeFalsy();

    value = component.checkEmailFormat("valido@gmail.com");
    expect(value).toBeTruthy();
  });

  it('Deberia controlar si el password se confirmo', () => {
    let value = false;

    // password no confirmado
    value = component.checkPassword("1", "0");
    expect(value).toBeFalsy();

    // password confirmado
    value = component.checkPassword("1", "1");
    expect(value).toBeTruthy();
  });
});
