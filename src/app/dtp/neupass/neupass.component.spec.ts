import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeupassComponent } from './neupass.component';

describe('NeupassComponent', () => {
  let component: NeupassComponent;
  let fixture: ComponentFixture<NeupassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeupassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NeupassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
