import { TestBed } from '@angular/core/testing';

import { NewtaskService } from './newtask.service';

describe('NewtaskService', () => {
  let service: NewtaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewtaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
