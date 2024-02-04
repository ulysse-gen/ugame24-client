import store from "@/store";
import { uGameClient } from "@/types/ugame-client";
import { Socket } from "socket.io-client";

export default async function PlayerRefresh(socket: Socket, Client: uGameClient.Client){
    if (Client.username == store.state.client?.username){
        if (store.state.client && store.state.client.Character && Client.Character)store.state.client.FromServer(Client);
    }else {
        if (store.state.clients.has(Client.username))store.state.clients.get(Client.username)?.FromServer(Client);
    }
}