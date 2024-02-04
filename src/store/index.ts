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
      this.state.socket = io('http://localhost:669', {
        auth: {
          token: "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDY5OTA5OTgsImV4cCI6MTcxNDc2Njk5OH0.7O-b57btCWEBfjiI2c9MXciM6GHc51HtcINg8a-REasnmgD65597v2XykIyvMFbE8Ke25fcEZFypCACQTiSqMg"
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
