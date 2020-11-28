import { IBeanieRoundEntity } from "./beanie.round.entity";
import { IBeaniePlayerScoreEnity } from "./beanie.playerscore.entity";
import { IBeaniePlayerEntity } from "./beanie.player.entity";

export interface IBeanieScoreBoardEntity {
    roundScores: IBeanieRoundEntity[];
    players: IBeaniePlayerEntity[];

    AddRound(roundIndex: number, scores: number[]): boolean;
}

export class BeanieScoreBoardEntity implements IBeanieScoreBoardEntity {
    roundScores: IBeanieRoundEntity[];
    players: IBeaniePlayerEntity[];

    constructor () {
        this.roundScores = new Array(13);
    }

    public AddRound(roundIndex: number, scores: number[]): boolean {

        this.roundScores[roundIndex] = { scores: new Array(this.players.length) } as IBeanieRoundEntity; 
        if (!scores || roundIndex === undefined) return false;
        if (this.players.length !== scores.length) return false;

        // Update scores for current round index;
        for (let plrIndex = 0; plrIndex < this.players.length; ++plrIndex) {
            this.roundScores[roundIndex].scores[plrIndex] = { score: scores[plrIndex], total: 0 } as IBeaniePlayerScoreEnity;
        }

        // Update all Totals after and included current round index
        for (let index = roundIndex; index < this.roundScores.length; ++index) {
            this.UpdateTotals(index);
        }
    }

    private UpdateTotals(index: number): void {

        let round = this.roundScores[index];
        if (!round) return;

        // for each player...
        for (let plrIndex = 0; plrIndex < this.players.length; ++plrIndex) {

            // sum each players score with scores in previous rounds.
            let sum: number = this.roundScores[index].scores[plrIndex].score;
            for (let i = 0; i < index; ++i) {

                let currRound = this.roundScores[i];
                if (!currRound) continue;
                if (!currRound.scores || !currRound.scores[plrIndex]) return;
                if (!currRound.scores[plrIndex].score === undefined) return;

                sum += currRound.scores[plrIndex].score;
            }

            // insert sum into plater total;
            round.scores[plrIndex].total = sum;
        }
    }
}