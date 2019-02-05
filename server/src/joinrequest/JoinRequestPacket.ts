import {normalizeHexString} from "../utils";

export default class JoinRequestPacket {
    appEUI: string;
    devEUI: string;
    devNOnce: number;
    mic: string;
    
    constructor(payload: {appEUI: string, devEUI: string, devNOnce: string, mic: string}) {
        this.appEUI = normalizeHexString(payload.appEUI);
        this.devEUI = normalizeHexString(payload.devEUI);
        this.devNOnce = parseInt(payload.devNOnce, 16);
        this.mic = normalizeHexString(payload.mic);
    }
}