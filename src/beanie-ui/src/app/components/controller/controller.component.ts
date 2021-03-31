import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  //playerArray: string[];
  roundWilds: string[] = ["Aces", "Twos", "Threes", "Fours", "Fives", "Sixes", "Sevens", "Eights", "Nines", "Tens", "Jacks", "Queens", "Kings"];
  scoreForm: FormGroup;
  currentRound: number = 0;
  roundsPlayed: number = 0;
  errorMessage: string = "";//"There are errors: This is a very long error for testing the formatting of the error message on the page.";
  playerNames: string[] = [];

  get players(): FormArray {
    return <FormArray>this.scoreForm.get('players');
  }

  constructor(
    private fb: FormBuilder, 
    private manager: BeanieManagerService) { }

  ngOnInit(): void {  
    this.scoreForm = this.fb.group({
      players: this.fb.array([])
    })

    this.setPlayers();
  }

  private setPlayers(): void {
    this.scoreBoard.players.forEach(x => {
      this.playerNames.push(x.name);

      this.players.push(this.fb.group({
        points: null,
        penalty: false
      }));
    });
  }

  setScores(): void {
    this.manager.SetScores(this.players.value);

    // If the current round is index 12, there are no more rounds
    if (this.currentRound === 12)
    {
      // TODO:  Trigger end of game!
      return;
    }

    // If the current round is the latest round played (i.e. Not correcting an earlier score)
    // Increase the rounds played and current round counters.
    if (this.currentRound === this.roundsPlayed) {
      this.manager.SetActiveRound(++this.currentRound);
      this.manager.SetLatestRound(++this.roundsPlayed);
    }
    // Else return to the newest frame
    else {
      this.currentRound = this.roundsPlayed;
      this.manager.SetActiveRound(this.roundsPlayed);
    }

    this.scoreForm.reset();
    this.changeDetected.emit(null);
  }

  Previous(): void {
    this.manager.SetActiveRound(--this.currentRound);
    let roundScores = this.manager.GetRoundScores();
    console.log("Round SCORES");
    console.log(roundScores);
    this.players.patchValue(roundScores);
    this.changeDetected.emit(null);
  }

  Next(): void {
    this.manager.SetActiveRound(++this.currentRound);
    let roundScores = this.manager.GetRoundScores();
    this.players.patchValue(roundScores);
    this.changeDetected.emit(null);
  }
}
