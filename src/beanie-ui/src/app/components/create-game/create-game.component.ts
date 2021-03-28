import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeanieService } from 'src/app/services/beanie-service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  players: string[] = [ "Stephen", "James", "Jenni", "Aaron" ];

  constructor(private beanieService: BeanieService, private route: Router) { }

  ngOnInit(): void {
  }

  AddPlayer(): void {
    this.players.push("");
  }

  StartGame(): void {
    let players = this.players.filter(x => x != "");
    console.log(players);
    this.beanieService.StartGame(players).subscribe({next: () => {}, error: (error) => console.log(error)});
    this.route.parseUrl('/');
  }
}
