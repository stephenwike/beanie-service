import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameBoard } from '../models/gameboard.model';
import { PlayerScore } from '../models/player-score.model';

@Injectable({
  providedIn: 'root'
})
export class BeanieService {

  baseUri = environment.beanie_url;

  constructor(private http: HttpClient) { }

  StartGame(players: string[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers
    };
    
    return this.http.post(this.baseUri + "creategame", players, options);
  }

  SendRoundScores(round: number, scores: PlayerScore[]) {
    this.http.put(this.baseUri + `/score/${round}`, JSON.stringify(scores));
  }

  GetScoreBoard(): Observable<GameBoard> {
    return this.http.get<GameBoard>(this.baseUri);
  }
}
