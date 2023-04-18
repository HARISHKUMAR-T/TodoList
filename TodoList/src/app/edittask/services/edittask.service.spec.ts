import { TestBed } from '@angular/core/testing';

import { EdittaskService } from './edittask.service';

describe('EdittaskService', () => {
  let service: EdittaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdittaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
