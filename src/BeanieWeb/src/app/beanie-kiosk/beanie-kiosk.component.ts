import { Component, OnInit } from '@angular/core';
import { GameBoard } from '../models/gameboard.model';
import { BeanieService } from '../services/beanie-service';

@Component({
  selector: 'app-beanie-kiosk',
  templateUrl: './beanie-kiosk.component.html',
  styleUrls: ['./beanie-kiosk.component.scss']
})
export class BeanieKioskComponent implements OnInit {

  scoreBoard: GameBoard = {
    players: [
      { name: "Stephen", scores: [ 0, 9, 0 ] },
      { name: "Aaron", scores: [ 0, 15, 0 ] },
      { name: "James", scores: [ 0, 8, 9 ] },
      { name: "Jenni", scores: [ 0, 10, 0 ] },
      { name: "Tim", scores: [ 1, 3, 0 ] },
      { name: "Leander", scores: [ 0, 1, 0 ] }
    ]
  }

  rounds: string[] = [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
  ]
  
  Sum(scores: number[]): number {
    return scores.reduce((x,y) => {return x + y});
  }

  constructor(private beanieService: BeanieService) { }

  ngOnInit(): void {
    this.beanieService.GetScoreBoard().subscribe({
      next: (scoreboard: GameBoard) => { this.scoreBoard = scoreboard; console.log(this.scoreBoard)},
      error: (error) => console.log(error)
    });
  }

}
