import { uGameClient } from '@/types/ugame-client'
import { Socket, io } from 'socket.io-client'
import { createStore } from 'vuex'
import GameMap from "@/assets/classes/ImagesHelper"
import Client from '@/assets/classes/Client'

export default createStore({
  state: {
    socket: null as Socket | null,
    client: null as Client | null,
    clients: new Map as Map<string, Client>,
    canvas: null as null | HTMLCanvasElement,
    context: null as null | CanvasRenderingContext2D,
    map: null as null | GameMap,
  },
  getters: {
  },
  mutations: {
    ClientSet(state, client: uGameClient.SelfClient) {
      state.client = new Client().FromServer(client);
    },
    CanvasSet(state, Canvas: HTMLCanvasElement){
      state.canvas = Canvas;
      state.context = Canvas.getContext("2d");
      state.map = new GameMap(state.context, 30000, 30000, "/assets/imgs/map_1.png")
    }
  },
  actions: {
    ConnectToServer() {
      this.state.socket = io((process.env.VUE_APP_SOCKET_URL || "http://localhost") + ":" + (process.env.VUE_APP_SOCKET_PORT || "669"), {
        auth: {
          token: process.env.VUE_APP_TOKEN
        }
      })
    },
    async AttachEvents() {
      if (!this.state.socket)return;
      this.state.socket.on('welcome', (data) => import(`@/events/on.welcome`).then(event => event.default(this.state.socket as Socket, data)));
      this.state.socket.on('welcome-back', (data) => import(`@/events/on.welcome`).then(event => event.default(this.state.socket as Socket, data)));
      this.state.socket.on('kick-reason', (data) => import(`@/events/on.kick-reason`).then(event => event.default(this.state.socket as Socket, data)));
      this.state.socket.on('player-refresh', (data) => import(`@/events/on.player-refresh`).then(event => event.default(this.state.socket as Socket, data)));
    },
    async PlayerRefresh() {
      if (!this.state.socket || !this.state.client || !this.state.client.Character)return;
      this.state.socket.emit('player-refresh', this.state.client.ServerVersion);
    }
  },
  modules: {
  }
})
