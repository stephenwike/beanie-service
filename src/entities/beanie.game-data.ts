import { IBeanieScoreBoardEntity, BeanieScoreBoardEntity } from "./beanie.scoreboard.entity";

export class BeanieGameData {

    scoreboard: IBeanieScoreBoardEntity

    private static instance: BeanieGameData;
    private constructor() {
        this.scoreboard = new BeanieScoreBoardEntity();
    }
    static getInstance() {
        if (!BeanieGameData.instance) {
            BeanieGameData.instance = new BeanieGameData();
            // ... any one time initialization goes here ...
        }
        return BeanieGameData.instance;
    }

}

