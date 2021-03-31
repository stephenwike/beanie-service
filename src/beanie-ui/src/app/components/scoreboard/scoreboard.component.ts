import { Component, Input, OnInit } from '@angular/core';
import { ScoreBoard } from 'src/app/models/scoreboard.model';
import { BeanieManagerService } from 'src/app/services/beanie-manager.service';
import { BeanieService } from 'src/app/services/beanie-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  @Input() scoreBoard: ScoreBoard;

  rounds: string[] = [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
  ]

  constructor(
    private manager: BeanieManagerService) { }

  ngOnInit(): void {
    if (!this.scoreBoard)
    {
      this.refreshScoreboard();
      setInterval(() => this.refreshScoreboard(), 5000);
    }

    // this.beanieService.GetScoreBoard().subscribe({
    //   next: (scoreboard: GameBoard) => { this.scoreBoard = scoreboard; console.log(this.scoreBoard)},
    //   error: (error) => console.log(error)
    // });
  }

  refreshScoreboard() {
    this.scoreBoard = this.manager.GetScoreBoard();
  }

  DisplayScore(score)
  {
    if (score) {
      return score.points + (score.penalty ? 100 : 0);
    }
    else return null;
  }

  Sum(scores: number[]): number {
    let points = scores.map(x => this.DisplayScore(x));
    return points.reduce((x,y) => {return x + y});
  }
}
