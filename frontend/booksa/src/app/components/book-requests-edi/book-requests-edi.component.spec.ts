import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BookRequestsEdiComponent } from './book-requests-edi.component';

describe('BookRequestsEdiComponent', () => {
  let component: BookRequestsEdiComponent;
  let fixture: ComponentFixture<BookRequestsEdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  BookRequestsEdiComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRequestsEdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Deberia poder Obtener libro de la base de datos', () => {
  //   component.showBooks() //metodo que hace la peticion para solicitar libros

  //   expect(component).toBeTruthy();
  // });
});
