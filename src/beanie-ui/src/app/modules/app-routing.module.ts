import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeanieCalculatorComponent } from '../beanie-calculator/beanie-calculator.component';
import { BeanieControllerComponent } from '../beanie-controller/beanie-controller.component';
import { BeanieKioskComponent } from '../beanie-kiosk/beanie-kiosk.component';
import { BeanieComponent } from '../beanie/beanie.component';
import { ControllerComponent } from '../components/controller/controller.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: BeanieComponent },
  { path: 'kiosk', component: BeanieKioskComponent },
  { path: 'controller', component: ControllerComponent },
  { path: 'calculator', component: BeanieCalculatorComponent },
  { path: 'setup', component: BeanieControllerComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
