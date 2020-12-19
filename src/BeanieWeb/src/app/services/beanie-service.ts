import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PlayerScore } from '../models/player-score.model';

@Injectable({
  providedIn: 'root'
})
export class BeanieService {

  constructor(private http: HttpClient) { }

  StartGame() {
    // TODO:  This will send a message to the backend signifying a new game begins
    //this.http.post(this.baseUri + "/start");
  }

  SendRoundScores(scores: PlayerScore[]) {
    // TODO: Sends the round scores to the backend service.
    //this.http.put(this.baseUri + "/score");
  }
}
