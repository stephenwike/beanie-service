import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BeanieManagerService } from 'src/app/services/beanie-manager.service';
import { BeanieService } from 'src/app/services/beanie-service';
import { PlayerGeneratorService } from 'src/app/services/player-generator.service';
import { UtilityService } from 'src/app/services/utility.service';

import { CreateGameComponent } from './create-game.component';

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      declarations: [ CreateGameComponent ],
      providers: [ BeanieManagerService, UtilityService, PlayerGeneratorService, FormBuilder, BeanieService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
