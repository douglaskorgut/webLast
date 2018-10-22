import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavcompComponent } from './navcomp.component';

describe('NavcompComponent', () => {
  let component: NavcompComponent;
  let fixture: ComponentFixture<NavcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
