import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingListEditComponent } from './working-list-edit.component';

describe('WorkingListEditComponent', () => {
  let component: WorkingListEditComponent;
  let fixture: ComponentFixture<WorkingListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingListEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkingListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
