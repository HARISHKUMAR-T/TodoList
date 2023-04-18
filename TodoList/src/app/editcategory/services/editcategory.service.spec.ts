import { TestBed } from '@angular/core/testing';

import { EditcategoryService } from './editcategory.service';

describe('EditcategoryService', () => {
  let service: EditcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
