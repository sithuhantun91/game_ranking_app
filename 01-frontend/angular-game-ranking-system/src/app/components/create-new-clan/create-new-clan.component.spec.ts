import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewClanComponent } from './create-new-clan.component';

describe('CreateNewClanComponent', () => {
  let component: CreateNewClanComponent;
  let fixture: ComponentFixture<CreateNewClanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewClanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewClanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
