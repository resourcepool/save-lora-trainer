import GpsLocationPacket from "./GpsLocationPacket";

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
     * true if the message contains a GpsLocation
     * false otherwise
     */
    isSupported(): boolean {
        // @ts-ignore
        return ((this.msg.object || {}).gpsLocation || [])[1];
    }

    /**
     * @returns {GpsLocationPacket}
     * Example:
     * {
     *   devEUI: string;
     *   latitude: number;
     *   longitude: number;
     *   altitude: number;
     * }
     */
    decode(): GpsLocationPacket {

        // @ts-ignore
         return new GpsLocationPacket(this.msg.devEUI, this.msg.object.gpsLocation[1]);
    }

}
