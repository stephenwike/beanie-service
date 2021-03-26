import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BeanieService } from '../services/beanie-service';

@Component({
  selector: 'app-beanie-controller',
  templateUrl: './beanie-controller.component.html',
  styleUrls: ['./beanie-controller.component.scss']
})
export class BeanieControllerComponent implements OnInit {

  createGameForm: FormGroup;
  newPlayer: string = "";
  gameName: string = "";

  get players(): FormArray {
    return <FormArray>this.createGameForm.get("players");
  }

  constructor(private fb: FormBuilder, private beanieService: BeanieService) { }

  ngOnInit(): void {
    this.createGameForm = this.fb.group({
      players: this.fb.array([this.BuildPlayer(), this.BuildPlayer(), this.BuildPlayer()])
    })

    // let playerFormArray = this.createGameForm.get('players');
    // playerFormArray.valueChanges.subscribe(
    //   value => this.players.push(this.fb.control({}))
    // )
  }

  CreateGame(): void {
    console.log("Game Name = " + this.gameName);
  }

  AddPlayer(): void {
    this.players.push(this.BuildPlayer());
  }

  BuildPlayer(): FormControl {
    return this.fb.control("", Validators.required);
  }

  StartGame(): void {
    this.beanieService.StartGame(this.players.getRawValue());
    console.log("AFTER!!!!!")
  }
}
