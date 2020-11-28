import { IBeaniePlayerEntity } from '../entities/beanie.player.entity';
import { BaseUtilites } from '../helpers/base-utilities';
import { BeanieGameData } from '../entities/beanie.game-data';
import { IBeanieRoundEntity } from '../entities/beanie.round.entity';

export class BeanieService {

    private gameData: BeanieGameData;

    constructor() {
        this.gameData = BeanieGameData.getInstance();
    }

    public SetPlayers(playerList: string[]): boolean {

        // check that player list has length and is truthy.
        if(!playerList || playerList.length < 2) return false;
        if(BaseUtilites.FindDuplicate(playerList)) return false;

        // determine dealer.
        let dealerIndex = Math.floor(BaseUtilites.GetRandomNumberBetween(0, playerList.length));

        // create player array.
        try {
            let players: IBeaniePlayerEntity[];
            players = [];
            
            for (let index = 0; index < playerList.length; ++index) {
                let plrName:string = playerList[index];
                if (!plrName || plrName === "" || typeof plrName !== 'string') { return false; }
                let isDealer: boolean = (index === dealerIndex);
                players.push({ name: plrName, isFirstDealer: isDealer });
            }

            this.gameData.scoreboard.players = players;
        }
        catch {
            return false;
        }

        // reset scores
        this.ResetScore();

        return true;
    }

    public GetPlayers(): IBeaniePlayerEntity[] {
        return this.gameData.scoreboard.players;
    }

    public SetRoundScores(roundIndex: number, scores: number[]): boolean {

        // check score length equals number of players
        if (scores.length !== this.gameData.scoreboard.players.length) return false;

        this.gameData.scoreboard.AddRound(roundIndex, scores);

        return true;
    }

    public GetScores(): IBeanieRoundEntity[] {
        return this.gameData.scoreboard.roundScores;
    }

    public ResetScore(): void {
        this.gameData.scoreboard.roundScores = new Array(this.gameData.scoreboard.roundScores.length);
    }

    public ClearPlayers(): void {
        this.gameData.scoreboard.players = [];
    }
}

