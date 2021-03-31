import { PlayerScore } from './player-score.model';

export class Player {
    name: string;
    scores: PlayerScore[] = new Array<PlayerScore>(13);
    turnOrder: number;
}