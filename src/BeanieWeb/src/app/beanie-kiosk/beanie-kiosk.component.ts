import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';

@Component({
  selector: 'app-beanie-kiosk',
  templateUrl: './beanie-kiosk.component.html',
  styleUrls: ['./beanie-kiosk.component.scss']
})
export class BeanieKioskComponent implements OnInit {

  players: Player[] = [ 
    { Name: "Stephen", Scores: [ 0, 9, 0 ] },
    { Name: "Aaron", Scores: [ 0, 15, 0 ] },
    { Name: "James", Scores: [ 0, 8, 9 ] },
    { Name: "Jenni", Scores: [ 0, 10, 0 ] },
    { Name: "Tim", Scores: [ 1, 3, 0 ] },
    { Name: "Leander", Scores: [ 0, 1, 0 ] }
  ];

  rounds: string[] = [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
  ]
  
  Sum(scores: number[]): number {
    return scores.reduce((x,y) => {return x + y});
  }

  constructor() { }

  ngOnInit(): void {
  }

}
