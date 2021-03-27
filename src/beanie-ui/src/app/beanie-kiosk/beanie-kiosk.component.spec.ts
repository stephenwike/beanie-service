import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanieKioskComponent } from './beanie-kiosk.component';

describe('BeanieKioskComponent', () => {
  let component: BeanieKioskComponent;
  let fixture: ComponentFixture<BeanieKioskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeanieKioskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanieKioskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
