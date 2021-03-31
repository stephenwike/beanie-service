import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControllerComponent } from '../components/controller/controller.component';
import { CreateGameComponent } from '../components/create-game/create-game.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FindGameComponent } from '../components/find-game/find-game.component';
import { NewOrExistingPromptComponent } from '../components/new-or-existing-prompt/new-or-existing-prompt.component';
import { ScoreCalculatorComponent } from '../components/score-calculator/score-calculator.component';
import { ScoreboardComponent } from '../components/scoreboard/scoreboard.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: NewOrExistingPromptComponent },
  { path: 'creategame', component: CreateGameComponent },
  { path: 'findgame', component: FindGameComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'controller', component: ControllerComponent },
  { path: 'calculator', component: ScoreCalculatorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
