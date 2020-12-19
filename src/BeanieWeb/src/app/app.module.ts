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
import { BeanieComponent } from './beanie/beanie.component';
import { BeanieKioskComponent } from './beanie-kiosk/beanie-kiosk.component';
import { BeanieControllerComponent } from './beanie-controller/beanie-controller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControllerComponent } from './components/controller/controller.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BeanieCalculatorComponent,
    BeanieComponent,
    BeanieKioskComponent,
    BeanieControllerComponent,
    ControllerComponent
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
