import * as utils from '../../utils';
import GpsLocationPacket from "./gpsLocationPacket";

export default class GpsLocationPacketDecoder {

    private topic: string;
    private msg?: Object;
    private payload?: Buffer;

    constructor(topic: string, msg: Buffer) {
        this.topic = topic;
        if (msg.length === 0) {
            return;
        }
        this.msg = JSON.parse(msg.toString());
        // @ts-ignore
        if (this.msg && this.msg.phyPayload) {
            // @ts-ignore
            this.payload = Buffer.from(this.msg.phyPayload, 'base64');
        }
    }

    /**
     * @returns {boolean}
     * true if the message is indeed a join-request packet
     * false otherwise
     */
    isSupported(): boolean {
        // @ts-ignore
        return (this.msg.object.gpsLocation[1]);
    }

    /**
     * @returns {JoinRequestPacket}
     * Example:
     * {
     *   mic: [25, 31, 12, 39],
     *   appEui: [66, 66, 66, 66, 66, 66, 66, 66], <=> 42:42:42:42:42:42:42:42
     *   devEui: [0D, 25, 00, 00, AC, 1F, C2, 0A] <=> 13:37:00:00:
     * }
     */
    decode(): GpsLocationPacket {

        // @ts-ignore
         return new GpsLocationPacket(this.msg.devEUI,this.msg.object.gpsLocation[1]);
    }

}
