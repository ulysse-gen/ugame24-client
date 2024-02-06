import store from "@/store";
import { uGameClient } from "@/types/ugame-client";
import { Socket } from "socket.io-client";

export default async function Disconnect(socket: Socket){
    store.commit('Disconnected');
}