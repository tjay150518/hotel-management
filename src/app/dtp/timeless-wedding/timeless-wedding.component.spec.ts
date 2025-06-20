import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelessWeddingComponent } from './timeless-wedding.component';

describe('TimelessWeddingComponent', () => {
  let component: TimelessWeddingComponent;
  let fixture: ComponentFixture<TimelessWeddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelessWeddingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelessWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
