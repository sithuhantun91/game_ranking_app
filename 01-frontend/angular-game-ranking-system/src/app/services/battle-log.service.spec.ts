import { TestBed } from '@angular/core/testing';

import { BattleLogService } from './battle-log.service';

describe('BattleLogService', () => {
  let service: BattleLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
