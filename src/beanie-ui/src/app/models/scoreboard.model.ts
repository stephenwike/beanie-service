import { Player } from "./player.model";

export class ScoreBoard {
    players: Player[];
    activeRound: number = 0;
    latestRound: number = 0;
    gameId: string;
}