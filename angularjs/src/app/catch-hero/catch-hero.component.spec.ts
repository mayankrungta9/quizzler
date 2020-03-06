import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchHeroComponent } from './catch-hero.component';

describe('CatchHeroComponent', () => {
  let component: CatchHeroComponent;
  let fixture: ComponentFixture<CatchHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
