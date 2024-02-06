import store from "@/store";
import { uGameClient } from "@/types/ugame-client";
import { Socket } from "socket.io-client";

export default async function PlayerRefresh(socket: Socket, Client: uGameClient.Client | Array<uGameClient.Client>){
    if (!Array.isArray(Client) && Client.username)return RefreshPlayer(socket, Client);
    if (!Array.isArray(Client))return;
    Client.forEach(async IndividualClient => RefreshPlayer(socket, IndividualClient));
}

async function RefreshPlayer(socket: Socket, Client: uGameClient.Client){
    if (Client.username == store.state.uGame.Client?.username)return;
    store.commit('PlayerRefresh', Client);
}