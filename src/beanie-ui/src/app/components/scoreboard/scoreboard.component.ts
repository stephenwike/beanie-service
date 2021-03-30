import { Component, OnInit } from '@angular/core';
import { GameBoard } from 'src/app/models/gameboard.model';
import { BeanieService } from 'src/app/services/beanie-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  scoreBoard: GameBoard; //= {

  //   players: [
  //     { name: "Stephen", scores: [ 0, 9, 0 ] },
  //     { name: "Aaron", scores: [ 0, 15, 0 ] },
  //     { name: "James", scores: [ 0, 8, 9 ] },
  //     { name: "Jenni", scores: [ 0, 10, 0 ] },
  //     { name: "Tim", scores: [ 1, 3, 0 ] },
  //     { name: "Leander", scores: [ 0, 1, 0 ] }
  //   ]
  // }

  rounds: string[] = [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
  ]
  
  Sum(scores: number[]): number {
    return scores.reduce((x,y) => {return x + y});
  }

  constructor(private beanieService: BeanieService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    var players = this.storage.get("players");
    console.log(players);
    this.scoreBoard = { players: players }
    // this.beanieService.GetScoreBoard().subscribe({
    //   next: (scoreboard: GameBoard) => { this.scoreBoard = scoreboard; console.log(this.scoreBoard)},
    //   error: (error) => console.log(error)
    // });
  }
}
