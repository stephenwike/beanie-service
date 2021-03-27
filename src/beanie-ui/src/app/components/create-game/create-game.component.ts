import { Component, OnInit } from '@angular/core';
import { BeanieService } from 'src/app/services/beanie-service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  players: string[] = [ "Stephen", "James", "Jenni", "Aaron" ];

  constructor(private beanieService: BeanieService) { }

  ngOnInit(): void {
  }

  AddPlayer(): void {
    this.players.push("");
  }

  StartGame(): void {
    let players = this.players.filter(x => x != "");
    this.beanieService.StartGame(players);
  }
}
