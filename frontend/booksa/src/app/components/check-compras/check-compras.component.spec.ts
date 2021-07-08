import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckComprasComponent } from './check-compras.component';

describe('CheckComprasComponent', () => {
  let component: CheckComprasComponent;
  let fixture: ComponentFixture<CheckComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckComprasComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
