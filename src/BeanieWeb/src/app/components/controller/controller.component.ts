import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerScore } from 'src/app/models/player-score.model';
import { BeanieService } from 'src/app/services/beanie-service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  mockPlayerArray: string[] = ["James", "Aaron", "Leander", "Stephen", "Tim", "Jenni"];

  playerArray: string[];
  roundWilds: string[] = ["Aces", "Twos", "Threes", "Fours", "Fives", "Sixes", "Sevens", "Eights", "Nines", "Tens", "Jacks", "Queens", "Kings"];
  roundForm: FormGroup;
  currentRound: number = 0;
  roundsPlayed: number = 0;
  scores: PlayerScore[][];

  constructor(private fb: FormBuilder, private beanieService: BeanieService) { }

  ngOnInit(): void {
    // TODO: Remove this line.  This will be input from a rest request or passed as input.
    this.playerArray = this.mockPlayerArray;

    this.roundForm = this.fb.group({
      players: this.fb.array([])
    })
    // let frame: PlayerScore[] = [];
    // this.playerArray.forEach(player => {
    //   frame.push({ Name: player, Score: 0})
    // });
    // this.scores = new Array(13).fill(frame);
    // console.log(this.scores);
  }

  setScores(): void {
    // Send scores for the current round.
    //this.beanieService.SendRoundScores(this.scores[this.currentRound]);

    // If the current round is index 12, there are no more rounds
    if (this.currentRound === 12)
    {
      // TODO:  Trigger end of game!
      return;
    }

    // If the current round is the latest round played (i.e. Not correcting an earlier score)
    // Increase the rounds played and current round counters.
    if (this.currentRound === this.roundsPlayed) {
      ++this.currentRound;
      ++this.roundsPlayed;
    }
  }

  Previous(): void {
    --this.currentRound;
  }

  Next(): void {
    ++this.currentRound;
  }
}
