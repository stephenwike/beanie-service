import { Injectable } from '@angular/core';
import { PlayerScore } from '../models/player-score.model';
import { Player } from '../models/player.model';
import { ScoreBoard } from '../models/scoreboard.model';
import { BeanieService } from './beanie-service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BeanieManagerService {
  
  SCOREBOARD: string = "scoreboard";

  constructor(
    private localStorage: LocalStorageService,
    private service: BeanieService) { }
  
  CreateNewScoreBoard(gameId: string, players: Player[]) {
    let scoreboard = new ScoreBoard();
    scoreboard.gameId = gameId;
    scoreboard.players = players;
    this.localStorage.set(this.SCOREBOARD, scoreboard);
    //this.service.StartGame(scoreboard).subscribe({next: () => {}, error: (error) => console.log(error)});
  }

  GetScoreBoard() {
    return this.localStorage.get(this.SCOREBOARD);    
  }

  SetScoreBoard(scoreboard: ScoreBoard) {
    this.localStorage.set(this.SCOREBOARD, scoreboard);
  }

  SetScores(players: any) {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    for (let i = 0; i < players.length; ++i)
    {
      let playerScore = new PlayerScore();
      playerScore.points = players[i].points;
      playerScore.penalty = players[i].penalty;
      scoreboard.players[i].scores[scoreboard.activeRound] = playerScore;
      console.log("Creating Player Score...");
      console.log(playerScore);
    }
    console.log("SCOREBOARD");
    console.log(scoreboard);
    this.SetScoreBoard(scoreboard);
  }

  SetLatestRound(round: number) {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    scoreboard.latestRound = round;
    this.SetScoreBoard(scoreboard);
  }

  SetActiveRound(round: number) {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    scoreboard.activeRound = round;
    this.SetScoreBoard(scoreboard);
  }

  GetRoundScores(): PlayerScore[] {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    let playerScores: PlayerScore[] = [];
    scoreboard.players.forEach(x => {
      playerScores.push(x.scores[scoreboard.activeRound]);
    });
    console.log("PlayerScores");
    console.log(playerScores);
    return playerScores;
  }
}
