import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStayComponent } from './book-stay.component';

describe('BookStayComponent', () => {
  let component: BookStayComponent;
  let fixture: ComponentFixture<BookStayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookStayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
