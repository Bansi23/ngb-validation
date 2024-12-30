import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbValidationComponent } from './ngb-validation.component';

describe('NgbValidationComponent', () => {
  let component: NgbValidationComponent;
  let fixture: ComponentFixture<NgbValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgbValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
