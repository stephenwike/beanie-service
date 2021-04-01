import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialsModule } from './modules/app-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControllerComponent } from './components/controller/controller.component';
import { NewOrExistingPromptComponent } from './components/new-or-existing-prompt/new-or-existing-prompt.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { FindGameComponent } from './components/find-game/find-game.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { ScoreCalculatorComponent } from './components/score-calculator/score-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ControllerComponent,
    NewOrExistingPromptComponent,
    CreateGameComponent,
    FindGameComponent,
    DashboardComponent,
    ScoreboardComponent,
    ScoreCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialsModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
