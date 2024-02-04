
import { uGameClient } from "@/types/ugame-client";
import Character from "./Character";
import _ from 'lodash';


export default class Client {
    public username!: string;
    public pseudo!: boolean;

    public Character?: Character;

    get ServerVersion() {
        return _.mapValues(_.omit(this, []), (el: any) => (el.ServerVersion) ? el.ServerVersion : el)
    }

    FromServer(Client: uGameClient.Client, RecreateCharacter = true) {
        this.username = Client.username;
        this.pseudo = Client.pseudo
        if (Client.Character)this.Character = new Character(this).FromServer(Client.Character);
        return this;
    }
}