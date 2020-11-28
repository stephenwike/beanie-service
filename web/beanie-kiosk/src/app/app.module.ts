import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeanieComponent } from './beanie/beanie.component';
import { BeanieCalculatorComponent } from './beanie-calculator/beanie-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BeanieComponent,
    BeanieCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
