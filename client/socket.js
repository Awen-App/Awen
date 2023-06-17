import {io} from "socket.io-client";
import ADDRESS_IP from "./env";

export const socket=io(`http://${ADDRESS_IP}:4001`,{
    autoConnect:false
})

