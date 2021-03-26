import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GameBoard } from '../models/gameboard.model';
import { PlayerScore } from '../models/player-score.model';

@Injectable({
  providedIn: 'root'
})
export class BeanieService {

  baseUri = "https://localhost:5001/beanie"

  constructor(private http: HttpClient) { }

  StartGame(players: string[]) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Request-Method' : 'POST'
    // });
    // const options = {
    //   headers
    // };
    this.http.post(this.baseUri + "/start", players).subscribe({next: () => {}, error: (error) => console.log(error)});
  }

  SendRoundScores(round: number, scores: PlayerScore[]) {
    this.http.put(this.baseUri + `/score/${round}`, JSON.stringify(scores));
  }

  GetScoreBoard(): Observable<GameBoard> {
    return this.http.get<GameBoard>(this.baseUri);
  }
}
