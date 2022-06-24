import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BggService } from 'src/app/services/bggService';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
    selector: 'page',
    templateUrl: './game-chart-v2.component.html',
    styleUrls: ['./game-chart-v2.component.css'],
    animations: [
      trigger('upDown', [
        // ...
        state('down', style({
          transform: 'translateY(38px)'
        })),
        state('up', style({
          transform: 'translateY(-38px)'
        })),
        transition('* => up', [
          animate('0.1s')
        ]),
        transition('* => down', [
          animate('0.1s')
        ]),
      ]),
    ],
  })
export class GameListComponent implements OnInit {
  // private result: Observable<any>;
  games: any;
  name: string = "Hello";
  isOpen = true;

  constructor(private bggService: BggService) {}
    ngOnInit() {
      this.games = this.bggService.getCollection();
      console.log("gamess", this.games)

      const interval = setInterval(() => {
        this.sort2("#game-4098");
      }, 500);
    }

    onClick(event: Event, game: any) {
      var target = event.target || event.currentTarget;
    
      console.log(target);

      this.moveGameUp(game);

      // console.log('gamesToMoveDown', gamesToMoveDown)

      // this.isOpen = !this.isOpen;
    }

    moveGameUp(game: any)
    {
      const gamesToMoveDown = this.getAboveGames(game);

      game.state = 'up';
      gamesToMoveDown.forEach((game: any) => {
        game.state = 'down';
      });
    }

    getAboveGames(game: any)
    {
      return this.games.items.filter((o: any) => o.playSort === game.playSort && o.id !== game.id);
    }

    sort(id: string) {
      const element = document.querySelector(id) as HTMLElement
      element.style.order = "0";
    }

    sort2(id: string) {
      this.games.items.find((o: any) => o.id === "4098").plays++;
      this.games.items.find((o: any) => o.id === "4098").playSort--;

      this.games.items.forEach((game: any) => {
        const highestPlays = Math.max(...this.games.items.map((o: any) => o.plays));
        game.width = game.plays / highestPlays * 70;
      });
    }

    delay(time: any) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    
  }