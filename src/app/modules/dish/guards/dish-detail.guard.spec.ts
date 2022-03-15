import { TestBed } from '@angular/core/testing';

import { DishDetailGuard } from './dish-detail.guard';

describe('DishDetailGuard', () => {
  let guard: DishDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DishDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
