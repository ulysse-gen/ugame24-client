import { Socket } from "socket.io-client";

export default async function KickReason(socket: Socket, KickReason: string){
    console.log('Kicked for', KickReason)
}