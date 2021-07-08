import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    component.requests = [{ id: "0", name: "Jhonatan", email: "losajhonny@gmail.com", location: "zona1" }]
    component.users = [{ type: "client", name: "Jhonatan", email: "losajhonny@gmail.com" }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia retornar una solicitud', () => {
    let value = component.getRequest(0);

    expect(value).toBeDefined();
  });

  it('deberia retornar un usuario', () => {
    let value = component.getUser(0);

    expect(value).toBeDefined();
  });
});
