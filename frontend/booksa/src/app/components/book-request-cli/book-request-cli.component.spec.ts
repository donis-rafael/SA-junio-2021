import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookRequestCliComponent } from './book-request-cli.component';

describe('BookRequestCliComponent', () => {
  let component: BookRequestCliComponent;
  let fixture: ComponentFixture<BookRequestCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRequestCliComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRequestCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
