import { TestBed } from '@angular/core/testing';

import { SessionStorageHandlerService } from './session-storage-handler.service';

describe('SessionStorageHandlerService', () => {
  let service: SessionStorageHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
