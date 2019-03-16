import * as utils from '../../utils';
import {aesCmac} from 'node-aes-cmac';

import {randomRxInfo} from '../join-request-helper';

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

    build(gatewayMAC: string): string {
        let phyPayload = new Uint8Array(23);
        let joinRequestPayload = new Uint8Array(19);
        joinRequestPayload[0] = JoinRequestBuilder.MHDR;
        joinRequestPayload.set(this._appEUI!.reverse(), 1);
        joinRequestPayload.set(this._devEUI!.reverse(), 9);
        joinRequestPayload[17] = this._devNOnce! & 0x00FF;
        joinRequestPayload[18] = this._devNOnce!>>8 & 0x00FF;
        phyPayload.set(joinRequestPayload, 0);
        phyPayload.set(this.computeMIC(joinRequestPayload), 19);
        return JSON.stringify({
            rxInfo: randomRxInfo(gatewayMAC, 25),
            phyPayload: Buffer.from(phyPayload.buffer).toString('base64')
        });
    }

}
