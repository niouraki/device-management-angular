import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeviceManagementService } from './device-management.service';

describe('DeviceManagementService', () => {
  let service: DeviceManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(DeviceManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
