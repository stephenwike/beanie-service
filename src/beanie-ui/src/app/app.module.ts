import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeanieCalculatorComponent } from './beanie-calculator/beanie-calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialsModule } from './modules/app-materials.module';
import { BeanieControllerComponent } from './beanie-controller/beanie-controller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControllerComponent } from './components/controller/controller.component';
import { NewOrExistingPromptComponent } from './components/new-or-existing-prompt/new-or-existing-prompt.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { FindGameComponent } from './components/find-game/find-game.component';
import { AuthModule } from '@auth0/auth0-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BeanieCalculatorComponent,
    BeanieControllerComponent,
    ControllerComponent,
    NewOrExistingPromptComponent,
    CreateGameComponent,
    FindGameComponent,
    DashboardComponent,
    ScoreboardComponent
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
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'sw-services.us.auth0.com',
      clientId: 'Re8a71sSqj9nCR7ufVwRafDa89AU7x9b'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
