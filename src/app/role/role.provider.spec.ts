import { TestBed } from '@angular/core/testing';

import { RoleProvider } from './role.provider';

describe('RoleProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleProvider = TestBed.get(RoleProvider);
    expect(service).toBeTruthy();
  });
});
