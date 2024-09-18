import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClanComponent } from './search-clan.component';

describe('SearchClanComponent', () => {
  let component: SearchClanComponent;
  let fixture: ComponentFixture<SearchClanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchClanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchClanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
