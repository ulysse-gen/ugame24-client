import store from "@/store";
import { uGameClient } from "@/types/ugame-client";
import { Socket } from "socket.io-client";
import Client from "@/assets/classes/Client";

export default async function PlayerJoin(socket: Socket, client: uGameClient.Client){
    store.commit('PlayerJoin', new Client().FromServer(client));
    console.log('New player join', client.username)
}