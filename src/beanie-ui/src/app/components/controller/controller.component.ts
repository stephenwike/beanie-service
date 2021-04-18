import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ScoreBoard } from 'src/app/models/scoreboard.model';
import { BeanieManagerService } from 'src/app/services/beanie-manager.service';
import { PlayerScore } from 'src/app/models/player-score.model';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  @Input() scoreBoard: ScoreBoard;
  @Output() changeDetected: EventEmitter<any> = new EventEmitter<any>();

  roundWilds: string[] = ["Aces", "Twos", "Threes", "Fours", "Fives", "Sixes", "Sevens", "Eights", "Nines", "Tens", "Jacks", "Queens", "Kings"];
  scoreForm: FormGroup;
  activeRound: number = 0;
  latestRound: number = 0;
  errorMessage: string = "";
  playerNames: string[] = [];

  get players(): FormArray {
    return <FormArray>this.scoreForm.get('players');
  }

  constructor(
    private fb: FormBuilder, 
    private manager: BeanieManagerService) { }

  ngOnInit(): void {  
    if (!this.scoreBoard)
    {
      this.scoreBoard = this.manager.GetScoreBoard();
    }

    this.scoreForm = this.fb.group({
      players: this.fb.array([])
    })

    this.activeRound = this.manager.GetActiveRound();
    this.latestRound = this.manager.GetLatestRound();
    this.setPlayers();
  }

  private setPlayers(): void {
    this.scoreBoard?.players?.forEach(x => {
      this.playerNames.push(x.name);

      this.players.push(this.fb.group({
        points: null,
        penalty: false
      }));
    });
  }

  setScores(): void {
    let players: PlayerScore[] = [];
    console.log(this.players.value);
    for (let i = 0; i < this.players.value.length; ++i)
    {
      let player = new PlayerScore();
      player.penalty = this.players.value[i].penalty ? true : false;
      player.points = this.players.value[i].points;
      player.saved = true;
      players.push(player);
    };
    this.manager.SetScores(players);

    // If the current round is index 12, there are no more rounds
    if (this.activeRound === 12)
    {
      // TODO:  Trigger end of game!
      return;
    }

    // If the current round is the latest round played (i.e. Not correcting an earlier score)
    // Increase the rounds played and current round counters.
    if (this.activeRound === this.latestRound) {
      this.manager.SetActiveRound(++this.activeRound);
      this.manager.SetLatestRound(++this.latestRound);
    }
    // Else return to the latest frame
    else {
      this.activeRound = this.latestRound;
      this.manager.SetActiveRound(this.latestRound);
      this.manager.SetLatestRound(this.latestRound);
    }

    // Cleanup the form
    this.scoreForm.reset();
    this.changeDetected.emit(null);
  }

  Previous(): void {
    this.manager.SetActiveRound(--this.activeRound);
    let roundScores = this.manager.GetRoundScores();
    console.log("Round SCORES");
    console.log(roundScores);
    this.players.patchValue(roundScores);
    this.changeDetected.emit(null);
  }

  Next(): void {
    this.manager.SetActiveRound(++this.activeRound);
    let roundScores = this.manager.GetRoundScores();
    this.players.patchValue(roundScores);
    this.changeDetected.emit(null);
  }
}
