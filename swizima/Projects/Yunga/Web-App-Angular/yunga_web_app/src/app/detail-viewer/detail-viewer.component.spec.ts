import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewerComponent } from './detail-viewer.component';

describe('DetailViewerComponent', () => {
  let component: DetailViewerComponent;
  let fixture: ComponentFixture<DetailViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
