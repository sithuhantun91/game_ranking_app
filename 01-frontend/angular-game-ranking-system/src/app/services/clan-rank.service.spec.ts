import { TestBed } from '@angular/core/testing';

import { ClanRankService } from './clan-rank.service';

describe('ClanRankService', () => {
  let service: ClanRankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClanRankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
