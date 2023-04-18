import { TestBed } from '@angular/core/testing';

import { NewcategoryService } from './newcategory.service';

describe('NewcategoryService', () => {
  let service: NewcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
