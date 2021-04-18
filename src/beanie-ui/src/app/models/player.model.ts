import { PlayerScore } from './player-score.model';

export class Player {
    name: string;
    scores: PlayerScore[];
    turnOrder: number;
}