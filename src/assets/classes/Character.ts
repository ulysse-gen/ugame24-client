import { uGameClient } from "@/types/ugame-client";
import Client from "./Client";
import Spell from "./Spell";
import Vector2D from "./Vector2D";
import { DisplayCharacter } from "./ImagesHelper";
import store from "@/store";
import _ from "lodash";

export default class Character {
    public Client: Client;

    public money?: number;
    public mana?: number;
    public life?: number;

    public maxMana?: number;
    public maxLife?: number;

    public imgUrl!: string;

    public Spell1?: Spell;
    public Spell2?: Spell;
    public Spell3?: Spell;

    public position: Vector2D;
    public size: Vector2D;
    public Velocity: Vector2D;
    public SpeedModifier: Vector2D;
    public Movement: {up: boolean, down: boolean, left: boolean, right: boolean, dash: boolean};
    public Friction: number;

    public PreviousPosition: {x: number, y: number};

    public DisplayCharacter!: DisplayCharacter;
    constructor(Client: Client) {
        this.Client = Client;

        this.position = new Vector2D(0, 0);
        this.PreviousPosition = this.position.Values;
        this.size = new Vector2D(0, 0);
        this.Velocity = new Vector2D(0, 0);
        this.SpeedModifier = new Vector2D(0, 0);
        this.Movement = {
            up: false,
            down: false,
            left: false,
            right: false,
            dash: false
        }
        this.Friction = 0.5;
    }

    get ServerVersion() {
        return _.mapValues(_.omit(this, ["Client", "DisplayCharacter", "size", "PreviousPosition", "Movement", "Friction", "SpeedModifier"]), (el: any) => (el && el.ServerVersion) ? el.ServerVersion : el)
    }

    FromServer(Character: uGameClient.Character) {
        this.imgUrl = Character.imgUrl;
        this.position.set(Character.position);
        this.size.set(Character.size);
        this.DisplayCharacter = new DisplayCharacter(this, store.state.context, this.size.x, this.size.y, this.imgUrl);
        return this;
    }

    async Tick() {
        if (this.DisplayCharacter)this.DisplayCharacter.Draw();
        this.Velocity = this.Velocity.multiply(this.Friction);
        if (this.Movement.right)this.Velocity.x += 1;
        if (this.Movement.left)this.Velocity.x -= 1;
        if (this.Movement.up)this.Velocity.y -= 1;
        if (this.Movement.down)this.Velocity.y += 1;
        if (this.Movement.dash)this.Velocity = this.Velocity.multiply(1.2);
        this.position = this.position.add(this.Velocity);
        if (!this.position.equal(this.PreviousPosition))store.dispatch("PlayerRefresh");
        this.PreviousPosition = this.position.Values;
    }
}