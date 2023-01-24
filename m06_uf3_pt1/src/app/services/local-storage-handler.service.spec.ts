import { TestBed } from '@angular/core/testing';

import { LocalStorageHandlerService } from './local-storage-handler.service';

describe('LocalStorageHandlerService', () => {
  let service: LocalStorageHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
