import { TestBed } from '@angular/core/testing';

import { StationServicesService } from './station-services-service';

describe('StationServicesService', () => {
  let service: StationServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
