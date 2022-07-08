import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameChartV2 } from './components/game-chart/game-chart-v2.component';

const routes: Routes = [
	{path: 'contacts' , component: GameListComponent},
	{path: 'chart' , component: GameChartV2}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }