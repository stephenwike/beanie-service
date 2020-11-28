import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeanieCalculatorComponent } from './beanie-calculator/beanie-calculator.component';
import { BeanieComponent } from './beanie/beanie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: BeanieComponent },
  { path: 'calculator', component: BeanieCalculatorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
