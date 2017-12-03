import { TestBed, inject } from '@angular/core/testing';
import { BusyService } from './busy.service';
import { BusyComponent } from './busy/busy.component';

describe('BusyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusyService]
    });
  });

  it('should be created', inject([BusyService], (service: BusyService) => {
    expect(service).toBeTruthy();
  }));
});
