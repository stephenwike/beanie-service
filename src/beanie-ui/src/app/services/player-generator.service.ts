import { Injectable } from '@angular/core';
import { PlayerScore } from '../models/player-score.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerGeneratorService {

  Build(name: string): Player {
    let player = new Player();

    player.name = name;

    let fixedLength = 13;
    let scores = new Array<PlayerScore>();
    for (let i = 0; i < fixedLength; ++i)
    {
      let playerScore: PlayerScore = new PlayerScore();
      playerScore.points = 0;
      playerScore.penalty = false;
      playerScore.saved = false;
      scores.push(playerScore);
    }
    console.log("New Player Scores");
    console.log(scores);
    player.scores = scores;

    return player;
  }
}
