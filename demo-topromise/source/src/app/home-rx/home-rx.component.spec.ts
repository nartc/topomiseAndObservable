import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRxComponent } from './home-rx.component';

describe('HomeRxComponent', () => {
  let component: HomeRxComponent;
  let fixture: ComponentFixture<HomeRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
