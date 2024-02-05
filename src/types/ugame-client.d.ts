import Vector2D from "@/assets/classes/Vector2D";

export namespace uGameClient {
    interface SelfClient {
        id: number;
        username: string;
        role: string;
        pseudo: string;
    
        Character?: SelfCharacter;
    }

    interface Client {
        username: string;
        pseudo: string;
    
        Character?: Character;
    }

    interface SelfCharacter {
        money: number;
        mana: number;
        life: number;
    
        imgUrl: string;
    
        Spell1?: Spell;
        Spell2?: Spell;
        Spell3?: Spell;
    
        position: Vector2D;
        size: Vector2D;
    }

    interface Character {
        imgUrl: string;
    
        position: Vector2D;
        size: Vector2D;
    }
}