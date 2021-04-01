import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { BeanieManagerService } from 'src/app/services/beanie-manager.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  playersForm: FormGroup;
  gameId: string = "NJJKRS";

  get players(): FormArray {
    return <FormArray>this.playersForm.get('players');
  }

  constructor(
    private fb: FormBuilder, 
    private manager: BeanieManagerService, 
    private route: Router,
    private util: UtilityService) { }

  ngOnInit(): void {
    this.playersForm = new FormGroup({
      players: this.fb.array([ this.BuildPlayer(), this.BuildPlayer(), this.BuildPlayer() ])
    });
  }

  BuildPlayer(): FormGroup {
    return this.fb.group({
      username: ''
    })
  }

  AddPlayer(): void {
    this.players.push(this.BuildPlayer());
  }

  StartGame(): void {
    let players = this.players.controls.map(x => {
      let player = new Player()
      player.name = x.value.username;
      return player;
    });

    var firstPlayerIndex = Math.floor(Math.random() * players.length);
    var startSlice = players.slice(0, firstPlayerIndex);
    var endSlice = players.slice(firstPlayerIndex);
    players = endSlice.concat(startSlice)

    for (let i = 0; i < players.length; ++i)
    {
      players[i].turnOrder = i + 1;
    }
    
    console.log(players);
    this.manager.CreateNewScoreBoard(this.gameId, players);
    this.route.navigate(['/dashboard']);
  }
}
