import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScoreBoard } from '../models/scoreboard.model';
import { PlayerScore } from '../models/player-score.model';

@Injectable({
  providedIn: 'root'
})
export class BeanieService {

  baseUri = environment.beanie_url;

  constructor(private http: HttpClient) { }

  StartGame(scoreboard: ScoreBoard): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers
    };
    
    return this.http.post(this.baseUri + "creategame", scoreboard, options);
  }

  SetScores(scoreboard: ScoreBoard): Observable<any> {
    return this.http.put(this.baseUri + `scores`, scoreboard);
  }

  GetScoreBoard(id: string): Observable<ScoreBoard> {
    return this.http.get<ScoreBoard>(this.baseUri + `${id}`);
  }
}
