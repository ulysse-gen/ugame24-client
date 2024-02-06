import { uGameClient } from '@/types/ugame-client'
import { Socket, io } from 'socket.io-client'
import { createStore } from 'vuex'
import GameMap from "@/assets/classes/ImagesHelper"
import Client from '@/assets/classes/Client'
import uGame from '@/assets/classes/uGame'

export default createStore({
  state: {
    uGame: new uGame()
  },
  getters: {
    uGame: (state) => state.uGame,
    connected: (state) => state.uGame.connected,
    mapLoaded: (state) => state.uGame.Map && state.uGame.Map.isLoaded,
    loggedIn: (state) => (state.uGame.Socket != undefined)
  },
  mutations: {
    Disconnected(state) {
      state.uGame.Clients.clear();
      state.uGame.connected = false;
    },
    Connected(state) {
      state.uGame.connected = true;
    },
    ClientSet(state, client: uGameClient.SelfClient) {
      state.uGame.Client = new Client().FromServer(client);
    },
    CanvasSet(state, Canvas: HTMLCanvasElement){
      state.uGame.Canvas = Canvas;
      state.uGame.Map = new GameMap(state.uGame.Context, 30000, 30000, "/assets/imgs/map_1.png");
      state.uGame.Map.image.onload = () => {
        if (state.uGame.Map)state.uGame.Map.isLoaded = true;
      }
    },
    PlayerJoin(state, Client: Client){
      state.uGame.Clients.set(Client.username, Client);
    },
    PlayerLeave(state, ClientUsername: string){
      state.uGame.Clients.delete(ClientUsername);
    },
    SelfRefresh(state, Client: uGameClient.Client) {
      state.uGame.Client?.Refresh(Client);
    },
    PlayerRefresh(state, Client: uGameClient.Client) {
      state.uGame.Clients.get(Client.username)?.Refresh(Client);
    }
  },
  actions: {
    ConnectToServer(state, authToken: string = process.env.VUE_APP_TOKEN) {
      this.state.uGame.Socket = io((process.env.VUE_APP_SOCKET_URL || "http://localhost") + ":" + (process.env.VUE_APP_SOCKET_PORT || "669"), {
        auth: {
          token: authToken
        }
      });
      this.state.uGame.Socket.on('connect', () => import(`@/events/on.connect`).then(event => event.default(this.state.uGame.Socket as Socket)));
      this.state.uGame.Socket.on('disconnect', () => import(`@/events/on.disconnect`).then(event => event.default(this.state.uGame.Socket as Socket)));
      this.state.uGame.Socket.on('welcome', (data) => import(`@/events/on.welcome`).then(event => event.default(this.state.uGame.Socket as Socket, data)));
      this.state.uGame.Socket.on('welcome-back', (data) => import(`@/events/on.welcome`).then(event => event.default(this.state.uGame.Socket as Socket, data)));
      this.state.uGame.Socket.on('kick-reason', (data) => import(`@/events/on.kick-reason`).then(event => event.default(this.state.uGame.Socket as Socket, data)));
    },
    async AttachEvents() {
      this.state.uGame.Socket.on('player-join', (data) => import(`@/events/on.player-join`).then(event => event.default(this.state.uGame.Socket as Socket, data)));
      this.state.uGame.Socket.on('player-leave', (data) => import(`@/events/on.player-leave`).then(event => event.default(this.state.uGame.Socket as Socket, data)));
      this.state.uGame.Socket.on('player-refresh', (data) => import(`@/events/on.player-refresh`).then(event => event.default(this.state.uGame.Socket as Socket, data)));
      this.state.uGame.Socket.on('self-refresh', (data) => import(`@/events/on.self-refresh`).then(event => event.default(this.state.uGame.Socket as Socket, data)));
      this.state.uGame.Socket.on('players-online', (data) => import(`@/events/on.players-online`).then(event => event.default(this.state.uGame.Socket as Socket, data)));
    },
    async PlayerRefresh() {
      if (!this.state.uGame.Client)return;
      this.state.uGame.Socket.emit('player-refresh', this.state.uGame.Client.ServerVersion);
    }
  },
  modules: {
  }
})
