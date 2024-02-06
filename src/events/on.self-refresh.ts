import store from "@/store";
import { uGameClient } from "@/types/ugame-client";
import { Socket } from "socket.io-client";

export default async function SelfRefresh(socket: Socket, Client: uGameClient.SelfClient){
    if (Client.username)store.commit('SelfRefresh', Client);
}