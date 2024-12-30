import { TestBed } from '@angular/core/testing';

import { NgbValidationService } from './ngb-validation.service';

describe('NgbValidationService', () => {
  let service: NgbValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgbValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
