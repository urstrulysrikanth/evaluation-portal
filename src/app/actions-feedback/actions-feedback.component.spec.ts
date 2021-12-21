import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsFeedbackComponent } from './actions-feedback.component';

describe('ActionsFeedbackComponent', () => {
  let component: ActionsFeedbackComponent;
  let fixture: ComponentFixture<ActionsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
