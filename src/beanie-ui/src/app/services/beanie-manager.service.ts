import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
    this.service.StartGame(scoreboard).subscribe({next: () => {}, error: (error) => console.log(error)});
  }

  GetScoreBoard() {
    return this.localStorage.get(this.SCOREBOARD);
  }

  GetScoreBoardById(id: string): Promise<boolean> {
    return this.service.GetScoreBoard(id).toPromise().then(
      (scoreboard) => { 
        console.log("GetScoreBoardById: ");
        console.log(scoreboard);
        if (scoreboard != null)
        {
          this.localStorage.set(this.SCOREBOARD, scoreboard); 
          return true;
        }
        return false;
      }
    );
  }

  SetScoreBoard(scoreboard: ScoreBoard) {
    this.localStorage.set(this.SCOREBOARD, scoreboard);
  }

  SetScores(playerScores: PlayerScore[]) {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    for (let i = 0; i < playerScores.length; ++i)
    {
      scoreboard.players[i].scores[scoreboard.activeRound] = playerScores[i];
    }
    this.SetScoreBoard(scoreboard);
    this.service.SetScoreboard(scoreboard).subscribe({next: () => {}, error: (error) => console.log(error)});
  }

  GetLatestRound(): number {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    let latestround: number = scoreboard?.latestRound ? scoreboard.latestRound : 0;
    return latestround;
  }

  GetActiveRound(): number {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    let activeround: number = scoreboard?.activeRound ? scoreboard.activeRound : 0;
    return activeround;
  }

  SetLatestRound(round: number) {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    scoreboard.latestRound = round;
    this.SetScoreBoard(scoreboard);
    this.service.SetScoreboard(scoreboard).subscribe({next: () => {}, error: (error) => console.log(error)});
  }

  SetActiveRound(round: number) {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    scoreboard.activeRound = round;
    this.SetScoreBoard(scoreboard);
    this.service.SetScoreboard(scoreboard).subscribe({next: () => {}, error: (error) => console.log(error)});
  }

  GetRoundScores(): PlayerScore[] {
    let scoreboard: ScoreBoard = this.GetScoreBoard();
    let playerScores: PlayerScore[] = [];
    scoreboard.players.forEach(x => {
      playerScores.push(x.scores[scoreboard.activeRound]);
    });
    return playerScores;
  }
}
