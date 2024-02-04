import store from "@/store";
import { uGameClient } from "@/types/ugame-client";
import { Socket } from "socket.io-client";

export default async function Welcome(socket: Socket, Client: uGameClient.SelfClient){
    store.commit('ClientSet', Client);
}