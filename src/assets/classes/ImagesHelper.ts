import store from "@/store";
import Character from "./Character";
import Vector2D from "./Vector2D";

export class ImageHelper {
    context: CanvasRenderingContext2D;
    size: Vector2D;
    origin: Vector2D;
    image: HTMLImageElement;
    isLoaded: boolean;
    /**
     * Image helper is building an Image for you.
     * @param {CanvasRenderingContext2D} context 
     * @param {number} width 
     * @param {number} height 
     * @param {number} originX 
     * @param {number} originY 
     * @param {string} url 
     */
    constructor(context: CanvasRenderingContext2D, width = 100, height = 100, url = "/assets/imgs/test.png", originX = 0, originY = 0){
        this.context = context;
        this.size = new Vector2D(width, height);
        this.origin = new Vector2D(originX, originY);
        this.image = new Image(width, height);
        this.image.src = url;
        this.isLoaded = false;
        this.image.onload = () => {
            this.isLoaded = true;
        };
    }

    Draw(){
        if (this.isLoaded) {
            this.context.drawImage(this.image, this.origin.x, this.origin.y, this.size.x, this.size.y)
        } else {
            console.log("Image is not loaded, wait for it !");
        }
    }
}




/**
 * Map
 */
export default class Map extends ImageHelper {
    /**
     * Creation de la Map
     * @param {CanvasRenderingContext2D} context 2D canvas context to draw the map on 
     * @param {number} width la largeur de l'image
     * @param {number} height la hauteur de l'image
     * @param {string} url l'URL de l'image
     */
    
    constructor(context: any, width = 100, height = 100, url = "/assets/imgs/test.png"){
        super(context, width, height, url)
        this.origin.x -= (width / 2);
        this.origin.y -= (height / 2);
    }
}

/**
 * Character
 */
export class DisplayCharacter extends ImageHelper {
    /**
     * Creation du char
     * @param {CanvasRenderingContext2D} context 2D canvas context to draw the player on 
     * @param {number} width la largeur de l'image
     * @param {number} height la hauteur de l'image
     * @param {string} url l'URL de l'image
     */
    
    Character: Character;
    constructor(Character: Character,context: any, width = 100, height = 100, url = "/assets/imgs/test.png"){
        super(context, width, height, url)
        this.Character = Character;
    }

    set position(Position: Vector2D) {
        this.Character.position = Position;
    }

    get position() {
        return this.Character.position;
    }

    async Draw(){
        if (this.isLoaded) {
            this.context.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y)
        } else {
            console.log("Image is not loaded, wait for it !");
        }
    }
}

/**
 * Spell
 */
export class DisplaySpell extends ImageHelper {
    startedX: number;
    startedY: number;
    velX: any;
    velY: any;
    range: any;
    /**
     * Creation du char
     * @param {CanvasRenderingContext2D} context 2D canvas context to draw the player on 
     * @param {number} width la largeur de l'image
     * @param {number} height la hauteur de l'image
     * @param {string} url l'URL de l'image
     */
    
    constructor(context: any, width = 100, height = 100, url = "/assets/imgs/test.png", range: any, velX: any, velY: any){
        super(context, width, height, url)
        this.origin.x = 0;
        this.origin.y = 0;
        this.startedX = 0;
        this.startedY = 0;
        this.velX = velX;
        this.velY = velY;
        this.range = range;
    }
}