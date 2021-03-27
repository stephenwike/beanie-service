import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanieCalculatorComponent } from './beanie-calculator.component';

describe('BeanieCalculatorComponent', () => {
  let component: BeanieCalculatorComponent;
  let fixture: ComponentFixture<BeanieCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeanieCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanieCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
