import { uGameClient } from '@/types/ugame-client'
import { Socket, io } from 'socket.io-client'
import { createStore } from 'vuex'
import GameMap, { DisplayCharacter } from "@/assets/classes/ImagesHelper"
import Client from '@/assets/classes/Client'
import Character from '@/assets/classes/Character'

export default createStore({
  state: {
    socket: null as Socket | null,
    client: null as Client | null,
    clients: new Map as Map<string, Client>,
    canvas: null as null | HTMLCanvasElement,
    context: null as null | CanvasRenderingContext2D,
    map: null as null | GameMap
  },
  getters: {
    mapLoaded(state) {
      return (state.map && state.map && state.map.isLoaded);
    },
    loggedIn(state) {
      return state.client instanceof Client;
    },
    connected(state) {
      return (state.socket && state.socket.connected == true);
    }
  },
  mutations: {
    ClientSet(state, client: uGameClient.SelfClient) {
      state.client = new Client().FromServer(client);
    },
    CanvasSet(state, Canvas: HTMLCanvasElement){
      state.canvas = Canvas;
      state.context = Canvas.getContext("2d");
      state.map = new GameMap(state.context, 30000, 30000, "/assets/imgs/map_1.png")
    },
    PlayerJoin(state, Client: Client){
      state.clients.set(Client.username, Client);
    },
    SelfRefresh(state, Client: uGameClient.Client) {
      if (state.client && state.client.Character && Client.Character)state.client.Refresh(Client);
    },
    PlayerRefresh(state, Client: uGameClient.Client) {
      if (state.clients.has(Client.username))state.clients.get(Client.username)?.Refresh(Client);
    }
  },
  actions: {
    ConnectToServer(state, authToken: string = process.env.VUE_APP_TOKEN) {
      this.state.socket = io((process.env.VUE_APP_SOCKET_URL || "http://localhost") + ":" + (process.env.VUE_APP_SOCKET_PORT || "669"), {
        auth: {
          token: authToken
        }
      });
      this.state.socket.on('welcome', (data) => import(`@/events/on.welcome`).then(event => event.default(this.state.socket as Socket, data)));
      this.state.socket.on('welcome-back', (data) => import(`@/events/on.welcome`).then(event => event.default(this.state.socket as Socket, data)));
      this.state.socket.on('kick-reason', (data) => import(`@/events/on.kick-reason`).then(event => event.default(this.state.socket as Socket, data)));
    },
    async AttachEvents() {
      if (!this.state.socket)return;
      this.state.socket.on('player-join', (data) => import(`@/events/on.player-join`).then(event => event.default(this.state.socket as Socket, data)));
      this.state.socket.on('player-refresh', (data) => import(`@/events/on.player-refresh`).then(event => event.default(this.state.socket as Socket, data)));
      this.state.socket.on('players-online', (data) => import(`@/events/on.players-online`).then(event => event.default(this.state.socket as Socket, data)));
    },
    async PlayerRefresh() {
      if (!this.state.socket || !this.state.client || !this.state.client.Character)return;
      this.state.socket.emit('player-refresh', this.state.client.ServerVersion);
    }
  },
  modules: {
  }
})
