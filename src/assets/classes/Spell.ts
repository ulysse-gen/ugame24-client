import _ from "lodash";
import Character from "./Character";
import Client from "./Client";

export default class Spell {
    public Character: Character;
    public Client: Client;

    public name!: string;
    public description!: string;
    public manaCost!: string;
    public imgUrl!: string;
    public cooldown!: number;

    private CoolingDown: boolean;
    constructor(Character: Character){
        this.Character = Character;
        this.Client = Character.Client;

        this.CoolingDown = false;
    }

    get ServerVersion() {
        return _.mapValues(_.omit(this, ["Client", "Character"]), (el: any) => (el.ServerVersion) ? el.ServerVersion : el)
    }
}