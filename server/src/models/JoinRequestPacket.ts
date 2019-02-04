export default class JoinRequestPacket {
    appEUI: string;
    devEUI: string;
    devNOnce: string;
    mic: string;
    
    constructor(payload: {appEUI: string, devEUI: string, devNOnce: string, mic: string}) {
        this.appEUI = payload.appEUI;
        this.devEUI = payload.devEUI;
        this.devNOnce = payload.devNOnce;
        this.mic = payload.mic;
    }
}