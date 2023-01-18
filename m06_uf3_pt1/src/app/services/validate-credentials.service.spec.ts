import { TestBed } from '@angular/core/testing';

import { ValidateCredentialsService } from './validate-credentials.service';

describe('ValidateCredentialsService', () => {
  let service: ValidateCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
