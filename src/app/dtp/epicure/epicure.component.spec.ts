import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicureComponent } from './epicure.component';

describe('EpicureComponent', () => {
  let component: EpicureComponent;
  let fixture: ComponentFixture<EpicureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
