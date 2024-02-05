import store from "@/store";
import { uGameClient } from "@/types/ugame-client";
import { Socket } from "socket.io-client";

export default async function PlayerRefresh(socket: Socket, Client: uGameClient.Client){
    if (Client.username == store.state.client?.username){
        store.commit('SelfRefresh', Client);
    }else {
        store.commit('PlayerRefresh', Client);
    }
}