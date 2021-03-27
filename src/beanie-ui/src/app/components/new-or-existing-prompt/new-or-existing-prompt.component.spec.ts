import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrExistingPromptComponent } from './new-or-existing-prompt.component';

describe('NewOrExistingPromptComponent', () => {
  let component: NewOrExistingPromptComponent;
  let fixture: ComponentFixture<NewOrExistingPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrExistingPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrExistingPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
