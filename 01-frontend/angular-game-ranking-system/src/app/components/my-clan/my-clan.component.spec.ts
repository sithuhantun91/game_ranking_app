import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClanComponent } from './my-clan.component';

describe('MyClanComponent', () => {
  let component: MyClanComponent;
  let fixture: ComponentFixture<MyClanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyClanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyClanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
