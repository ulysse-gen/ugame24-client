import store from "@/store";
import { uGameClient } from "@/types/ugame-client";
import { Socket } from "socket.io-client";
import Client from "@/assets/classes/Client";

export default async function PlayersOnline(socket: Socket, clients: Array<uGameClient.Client>){
    clients.forEach(client => store.commit('PlayerJoin', new Client().FromServer(client)));
}