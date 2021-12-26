import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportdetailPreloadComponent } from './reportdetail-preload.component';

describe('ReportdetailPreloadComponent', () => {
  let component: ReportdetailPreloadComponent;
  let fixture: ComponentFixture<ReportdetailPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportdetailPreloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportdetailPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
