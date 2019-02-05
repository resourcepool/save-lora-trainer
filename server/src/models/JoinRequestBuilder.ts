import * as utils from '../utils';
import {aesCmac} from 'node-aes-cmac';
import btoa from 'btoa';

const MS_BTW_EPOCH_AND_GPS_EPOCH: number = new Date(1980, 0, 6, 0, 0, 0, 0).getTime();
export default class JoinRequestBuilder {
    private static readonly MHDR: number = 0x00;
    private _devEUI?: Uint8Array;
    private _appKey?: Uint8Array;
    private _appEUI?: Uint8Array;
    private _devNOnce?: number;

    constructor() {

    }

    static builder(): JoinRequestBuilder {
        return new JoinRequestBuilder();
    }

    appKey(str: string): JoinRequestBuilder {
        this._appKey = utils.hexStringToBytes(str);
        return this;
    }

    devEUI(str: string): JoinRequestBuilder {
        this._devEUI = utils.hexStringToBytes(str);
        return this;
    }

    appEUI(str: string): JoinRequestBuilder {
        this._appEUI = utils.hexStringToBytes(str);
        return this;
    }

    devNOnce(num: number): JoinRequestBuilder {
        this._devNOnce = num;
        return this;
    }

    private computeMIC(phyPayload: Uint8Array): Uint8Array {
        let appKeyBuffer = Buffer.alloc(this._appKey!.length);
        this._appKey!.reverse().forEach((v, i) => appKeyBuffer[i] = v);
        let phyPayloadBuffer = Buffer.alloc(phyPayload.length);
        phyPayload.forEach((v, i) => phyPayloadBuffer[i] = v);
        let cmac: string = aesCmac(appKeyBuffer, phyPayloadBuffer);
        return utils.hexStringToBytes(cmac).subarray(0, 4);
    }

    private computeGPSEpochString(date: Date): string {
        let msSinceEpoch = date.getTime();
        let msSinceGPSEpoch = msSinceEpoch - MS_BTW_EPOCH_AND_GPS_EPOCH;
        let secondsSinceGPSEpoch = Math.floor(msSinceGPSEpoch / 1000);
        let minutesSinceGPSEpoch = Math.floor(secondsSinceGPSEpoch / 60);
        let hoursSinceGPSEpoch = Math.floor(minutesSinceGPSEpoch / 60);
        return hoursSinceGPSEpoch + 'h' + (minutesSinceGPSEpoch - (hoursSinceGPSEpoch * 60)) + 'm' + ((secondsSinceGPSEpoch - (minutesSinceGPSEpoch * 60))) + '.' + (msSinceGPSEpoch - secondsSinceGPSEpoch * 1000 + 's');
    }
    
    build(gatewayMAC: string): string {
        let phyPayload = new Uint8Array(23);
        let joinRequestPayload = new Uint8Array(19);
        joinRequestPayload[0] = JoinRequestBuilder.MHDR;
        joinRequestPayload.set(this._appEUI!.reverse(), 1);
        joinRequestPayload.set(this._devEUI!.reverse(), 9);
        joinRequestPayload[17] = this._devNOnce! & 0x00FF;
        joinRequestPayload[18] = this._devNOnce! & 0xFF00;
        phyPayload.set(joinRequestPayload, 0);
        phyPayload.set(this.computeMIC(joinRequestPayload), 19);
        let date: Date = new Date();
        return JSON.stringify({
            rxInfo: {
                mac: gatewayMAC,
                time: date.toISOString(),
                timeSinceGPSEpoch: this.computeGPSEpochString(date),
                timestamp: Math.floor(date.valueOf() / 1000),
                frequency: 867300000,
                channel: 0,
                rfChain: 0,
                crcStatus: 1,
                codeRate: "5/5",
                rssi: -Math.floor(90 + Math.random() * 20),
                loRaSNR: -19,
                size: 25,
                dataRate: {modulation: "LORA", spreadFactor: 12, bandwidth: 125},
                board: 0,
                antenna: 0
            },
            phyPayload: Buffer.from(phyPayload.buffer).toString('base64')
        });
    }

}