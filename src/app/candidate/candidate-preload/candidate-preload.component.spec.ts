import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePreloadComponent } from './candidate-preload.component';

describe('CandidatePreloadComponent', () => {
  let component: CandidatePreloadComponent;
  let fixture: ComponentFixture<CandidatePreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatePreloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatePreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
