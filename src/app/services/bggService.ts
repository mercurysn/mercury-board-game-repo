import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Parser } from 'xml2js';  
import { CacheService } from './cacheService';

@Injectable ({
    providedIn: 'root'
})
export class BggService {
    constructor(private client: HttpClient, private cacheService: CacheService) { }

    getCollection() {
        // this.client.get('https://boardgamegeek.com/xmlapi/collection/mercury_sn');

        // setTimeout('', 20000);
        const parser = new Parser();
        const cacheItems = this.cacheService.getCache('bgg');

        if (cacheItems) {
          const games = JSON.parse(cacheItems)
          const mappedGames = this.map(games);

          mappedGames.items.sort(this.sortByPlays);

          console.log('mappedGames', mappedGames);

          mappedGames.items.forEach((game: any, rank: any) => {
            rank++;
            game.rank = rank;
            game.startRank = rank;
          });

          return mappedGames;
        }
        else {
          const value = this.client.get('https://boardgamegeek.com/xmlapi/collection/mercury_sn', {  
            responseType: 'text'  
          }).subscribe((data) => 
          {  
            parser.parseString(data, (err, result) => 
            {  
                var items = result.items;
                this.cacheService.setCache('bgg', JSON.stringify(items));
                console.log('api', items.item[0]); 
              })  
          });

          return value;
        }

        return null;
    }

    map(items: any) {
      const games = {
        totalItems: items.$.totalitems,
        pubdate: items.$.pubdate,
        items: items.item.map(this.mapItem)
      }

      console.log('map', games);
      return games;
    }

    sortByPlays(a: any, b: any) {
      if (parseInt(a.plays) < parseInt(b.plays)){
        return 1;
      }
      if (parseInt(a.plays) > parseInt(b.plays)){
        return -1;
      }
      return 0;
    }

    mapItem(item: any) {
      const mapStats = (stat: any) => {
        return {
          minPlayers: stat.$.minplayers,
          maxPlayers: stat.$.maxplayers,
          minPlayTime: stat.$.minplaytime,
          maxPlayTime: stat.$.maxplaytime,
          playTime: stat.$.playingtime,
          owners: stat.$.numowned,
        }
      };

      const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      const returnValue = {
        id: item.$.objectid,
        type: item.$.subtype,
        name: item.name[0]._,
        image: item.image,
        plays: parseInt(item.numplays[0]),
        playSort: 1000 - item.numplays[0],
        stats: mapStats(item.stats[0]),
        color: getRandomColor(),
        moveUpHeight: -38,
        moveDownHeight: 38,
      }

      return returnValue;
    }

    
}