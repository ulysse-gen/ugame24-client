import store from "@/store";
import Client from "./Client";
import { Socket } from "socket.io-client";
import DisplayMap from "./ImagesHelper";

export default class uGame {
    public Store: typeof store;
    public Socket!: Socket;

    public Clients: Map<string, Client>;
    public Maps: Map<string, DisplayMap>;

    public canvasAndContext?: {canvas?: HTMLCanvasElement, context?: CanvasRenderingContext2D};

    public token?: string;
    constructor() {
        this.Store = store;

        this.Clients = new Map();
        this.Maps = new Map();
    }

    set Canvas(Canvas: HTMLCanvasElement | undefined) {
        if (!Canvas)return;
        this.canvasAndContext = {canvas: Canvas, context: Canvas.getContext('2d') as CanvasRenderingContext2D};
    }

    get Canvas(){
        return this.canvasAndContext?.canvas;
    }

    get Context() {
        return this.canvasAndContext?.context;
    }

    set Client(Client: Client | undefined) {
        if (!Client)return;
        this.Clients.set("_SELF_", Client);
    }

    get Client(): Client | undefined {
        return this.Clients.get("_SELF_");
    }

    /*get ClientsButSelf() {
        return this.Clients.
    }*/

    set Map(Map: DisplayMap | undefined) {
        if (!Map)return;
        this.Maps.set("_CURRENT_", Map);
    }

    get Map() {
        return this.Maps.get("_CURRENT_");
    }

    set connected(connected: boolean) {
        return;
    }

    get connected() {
        return (this.Socket) ? this.Socket.connected : false;
    }
}