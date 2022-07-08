import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule} from './app.routing.module'
import { GameListComponent } from './components/game-list/game-list.component';
import { GameChartV2 } from './components/game-chart/game-chart-v2.component';
import { AppComponent } from './app.component';
import { BggService } from './services/bggService';
import { CacheService } from './services/cacheService'

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameChartV2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    BggService,
    CacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
