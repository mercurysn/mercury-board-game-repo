import { OnInit, Component } from '@angular/core';
import { BggService } from 'src/app/services/bggService';
import { slideDownState } from 'src/app/services/animationService';
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
          transform: 'translateY({{moveDownHeight}}px)'
        }), {params: {moveDownHeight: '38'}}),
        state('up', style({
          transform: "translateY({{moveUpHeight}}px)"
        }), {params: {moveUpHeight: '-38'}}),
        transition('* => up', [
          animate('0.1s')
        ]),
        transition('* => down', [
          animate('0.1s')
        ]),
      ]),
    ],
  })
export class GameChartV2 implements OnInit {
  // private result: Observable<any>;
  games: any;
  name: string = "Hello";
  isOpen = true;

  constructor(private bggService: BggService) {}
    ngOnInit() {
      this.games = this.bggService.getCollection();

      const interval = setInterval(() => {
        // this.pushNewValue("#game-4098", 3);
        // this.pushNewValue("161936", 1);
        this.pushNewValue("229853", 1);
      }, 500);
    }

    onClick(event: Event, game: any) {
      var target = event.target || event.currentTarget;

      // this.moveGameUp(game);

      this.pushNewValue(game.id, 1);


      // console.log('gamesToMoveDown', gamesToMoveDown)

      // this.isOpen = !this.isOpen;
    }

    // moveGameUp(game: any)
    // {
    //   const gamesToMoveDown = this.getAboveGames(game);

    //   game.states = 'up';
    //   gamesToMoveDown.forEach((game: any) => {
    //     game.states = 'down';
    //   });
    // }

    // getAboveGames(game: any)
    // {
    //   return this.games.items.filter((o: any) => o.playSort === game.playSort && o.id !== game.id);
    // }

    // moveGameUp2(game: any, oldValue: number, newValue: number)
    // {
    //   const gamesToMoveDown = this.getAboveGames2(game, oldValue, newValue);

    //   // console.log('state', game.state);

    //   if (gamesToMoveDown.length > 0) {
    //     debugger;
    //     game.rank -= gamesToMoveDown.length;
    //     // game.moveUpHeight = -38 * (game.startRank - game.rank);
    //     const {upHeight, downHeight} = this.calculateMoveHeight(game.startRank, game.rank);
    //     game.moveUpHeight = upHeight;
    //     game.states = 'up';
    //     gamesToMoveDown.forEach((moveDownGame: any) => {
    //       debugger;
    //       moveDownGame.rank++;
    //       const {upHeight, downHeight} = this.calculateMoveHeight(moveDownGame.startRank, moveDownGame.rank);
    //       moveDownGame.moveDownHeight = downHeight;
    //       moveDownGame.states = 'down';
    //     });
    //   }
    // }

    reorganiseGames() {
      this.games.items.sort(this.bggService.sortByPlays);

      this.games.items.forEach((game: any, rank: any) => {
        rank++;
        game.rank = rank;
      });

      let moveUp : [{id: string, height: number}] = [{ id: "0", height: 0 }];
      moveUp.push( { id: "1", height: 1 });

      let counter = 1;

      this.games.items.forEach((game: any) => {
        const heightToAdjust = this.calculateMoveHeight2(game.startRank, game.rank);

        // if (heightToAdjust > 0) {
        //   // this.games.items.find((o: any) => o.id === "229853").moveUpHeight = -76;
        //   // this.games.items.find((o: any) => o.id === "229853").states = 'up';
        //   game.moveDownHeight = heightToAdjust;
        //   game.states = 'down';
        //   console.log('name', game.name);
        //   console.log('ID', game.id);
        //   console.log('name', heightToAdjust);
          
        // }

        if (heightToAdjust < 0)
        {
          console.log(heightToAdjust);
          const id = "229853";
          moveUp.push( { id: id, height: heightToAdjust });
          moveUp.push( { id: game.id as string, height: heightToAdjust as number });
        }
        counter++;
        // if (heightToAdjust < 0) {
        //   moveUp.push( { id: game.id, height: heightToAdjust });
        //   game.moveUpHeight = heightToAdjust;
        //   game.states = 'up';
        //   console.log('name', game.name);
        //   console.log('ID', game.id);
        //   console.log('name', heightToAdjust);
        //  }
      });
      console.log(moveUp);

      moveUp.forEach((item) => {
        const game = this.games.items.find((o: any) => o.id === item.id);

        if (game)
        {
          game.moveUpHeight = item.height;
          game.states = 'up';
          this.games.items.find((o: any) => o.id === "229853").moveUpHeight = -38;
          this.games.items.find((o: any) => o.id === "229853").states = 'up';
        }
      });
      
      
    }

    // calculateMoveHeight(startRank: number, rank: number) {
    //   if (rank > startRank) {
    //     return {
    //       upHeight: -38,
    //       downHeight: (rank - startRank) * 38,
    //     };
    //   }

    //   if (startRank > rank)
    //   {
    //     return {
    //       upHeight: (startRank - rank) * -38,
    //       downHeight: 38
    //     };
    //   }
    //   return {upHeight: 0, downHeight: 0};
    // }

    calculateMoveHeight2(startRank: number, rank: number): number {
      if (rank > startRank) {
        return (rank - startRank) * 38;
      }

      if (startRank > rank)
      {
        return (startRank - rank) * -38;
      }
      return 0;
    }

    // getAboveGames2(game: any, oldValue: number, newValue: number)
    // {
    //   return this.games.items.filter((o: any) => o.plays < newValue && o.plays >= oldValue);
    // }

    // sort(id: string) {
    //   const element = document.querySelector(id) as HTMLElement
    //   element.style.order = "0";
    // }

    // sort2(id: string) {
    //   this.games.items.find((o: any) => o.id === "4098").plays++;
    //   this.games.items.find((o: any) => o.id === "4098").playSort--;

    //   this.games.items.forEach((game: any) => {
    //     const highestPlays = Math.max(...this.games.items.map((o: any) => o.plays));
    //     game.width = game.plays / highestPlays * 70;
    //   });
    // }

    pushNewValue(id: string, increment: number) {
      var game = this.games.items.find((o: any) => o.id === id);
      game.plays += increment;
      this.reorganiseGames();

      this.games.items.forEach((game: any) => {
        const highestPlays = Math.max(...this.games.items.map((o: any) => o.plays));
        game.width = game.plays / highestPlays * 70;
      });
    }

    delay(time: any) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    
  }