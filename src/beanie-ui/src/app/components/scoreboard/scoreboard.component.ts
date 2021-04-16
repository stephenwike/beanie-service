import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PlayerScore } from 'src/app/models/player-score.model';
import { ScoreBoard } from 'src/app/models/scoreboard.model';
import { BeanieManagerService } from 'src/app/services/beanie-manager.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnDestroy {

  @Input() scoreBoard: ScoreBoard;
  refresh;

  rounds: string[] = [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
  ]

  constructor(
    private manager: BeanieManagerService) { }

  ngOnInit(): void {
    this.refreshScoreboard();
    this.refresh = setInterval(() => this.refreshScoreboard(), 5000);
  }

  ngOnDestroy() {
    if (this.refresh) {
      clearInterval(this.refresh);
    }
  }

  refreshScoreboard() {
    console.log("Refreshing Scoreboard.");
    this.scoreBoard = this.manager.GetScoreBoard();
  }

  DisplayScore(scores: PlayerScore[], index: number)
  {   
    if (scores && scores.length > index && (scores[index]?.points || scores[index]?.points == 0)) {
      return scores[index].points + (scores[index]?.penalty ? 100 : 0);
    }
    else return null;
  }

  Sum(scores: PlayerScore[]): number {
    let sum = 0;
    if (scores) {
      for (let i = 0; i < scores.length; ++i)
      {
        sum += this.DisplayScore(scores, i);
      }
    }
    return sum;
  }
}
