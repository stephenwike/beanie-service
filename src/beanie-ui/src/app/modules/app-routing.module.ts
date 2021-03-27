import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeanieCalculatorComponent } from '../beanie-calculator/beanie-calculator.component';
import { BeanieControllerComponent } from '../beanie-controller/beanie-controller.component';
import { BeanieKioskComponent } from '../beanie-kiosk/beanie-kiosk.component';
import { BeanieComponent } from '../beanie/beanie.component';
import { ControllerComponent } from '../components/controller/controller.component';
import { CreateGameComponent } from '../components/create-game/create-game.component';
import { FindGameComponent } from '../components/find-game/find-game.component';
import { NewOrExistingPromptComponent } from '../components/new-or-existing-prompt/new-or-existing-prompt.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: BeanieComponent },
  { path: 'prompt', component: NewOrExistingPromptComponent },
  { path: 'creategame', component: CreateGameComponent },
  { path: 'findgame', component: FindGameComponent },
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
