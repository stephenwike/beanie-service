import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanieControllerComponent } from './beanie-controller.component';

describe('BeanieControllerComponent', () => {
  let component: BeanieControllerComponent;
  let fixture: ComponentFixture<BeanieControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeanieControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanieControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
