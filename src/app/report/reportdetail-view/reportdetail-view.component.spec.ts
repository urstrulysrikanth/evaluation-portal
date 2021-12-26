import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportdetailViewComponent } from './reportdetail-view.component';

describe('ReportdetailViewComponent', () => {
  let component: ReportdetailViewComponent;
  let fixture: ComponentFixture<ReportdetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportdetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportdetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
