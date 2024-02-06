
import { uGameClient } from "@/types/ugame-client";
import Character from "./Character";
import _ from 'lodash';


export default class Client {
    public username!: string;
    public pseudo!: string;

    public Character?: Character;

    get ServerVersion() {
        return _.mapValues(_.omit(this, []), (el: any) => (el.ServerVersion) ? el.ServerVersion : el)
    }

    FromServer(Client: uGameClient.Client, RecreateCharacter = true) {
        this.username = Client.username;
        this.pseudo = Client.pseudo
        if (Client.Character && (!this.Character || RecreateCharacter))this.Character = new Character(this).FromServer(Client.Character);
        return this;
    }
    
    Refresh(Client: uGameClient.Client) {
        if (!Client)return;
        this.username = Client.username;
        this.pseudo = Client.pseudo;

        if (!this.Character || !Client.Character)return;
        this.Character.position.set(Client.Character.position);
        //this.Character.Velocity.set(Client.Character.velocity);
        this.Character.imgUrl = Client.Character.imgUrl;
        this.Character.size.set(Client.Character.size);
    }
}