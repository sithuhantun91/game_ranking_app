import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBattleComponent } from './play-battle.component';

describe('PlayBattleComponent', () => {
  let component: PlayBattleComponent;
  let fixture: ComponentFixture<PlayBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayBattleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
