import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TaxesBookComponent } from './taxes-book.component';

describe('TaxesBookComponent', () => {
  let component: TaxesBookComponent;
  let fixture: ComponentFixture<TaxesBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxesBookComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Deberia poder Consultar una lista de paises', () => {
  //   // let value:boolean = false;
  //   component.llenarPaises();
  //   let value = component.hayPaises();
  //   expect(value).toBeTruthy();
  // });

  // it('Deberia poder calcular el impuesto de un Pais', () =>{
  //   component.llenarPaises(); //se llenan los paises
  //   let pais = component.paises[0]
  //   let value = component.hayImpuestoCalculado(pais,250)
  //   expect(value).toBeTruthy();
  // });
});
