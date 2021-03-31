import { Component, OnInit } from '@angular/core';
import { ScoreBoard } from 'src/app/models/scoreboard.model';
import { BeanieManagerService } from '../../services/beanie-manager.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  scoreBoard: ScoreBoard

  constructor(private manager: BeanieManagerService) { }

  ngOnInit(): void {
    this.scoreBoard = this.manager.GetScoreBoard();
    console.log(this.scoreBoard);
  }

  onChangeDetected(evt: any) {
    this.scoreBoard = this.manager.GetScoreBoard();
  }
}
