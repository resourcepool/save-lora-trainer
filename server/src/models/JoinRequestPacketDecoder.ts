import JoinRequestPacket from "./JoinRequestPacket";
import * as utils from '../utils';

export default class JoinRequestPacketDecoder {
  
  private topic: string;
  private msg: Object;
  private payload: Buffer|undefined;
  
  constructor(topic: string, msg: Buffer) {
    this.topic = topic;
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
    if (!this.payload) {
      return false;
    }
    if (this.payload.length < 5) {
      return false;
    }
    let prefix = this.payload.readInt8(0);
    return prefix === 0x00;
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
  decode(): JoinRequestPacket {
    // @ts-ignore
    let request : {
      appEUI: string,
      devEUI: string,
      devNOnce: string,
      mic: string
    } = {};
    request.appEUI = utils.bytesToHexString(this.payload!.slice(1, 9).reverse());
    request.devEUI = utils.bytesToHexString(this.payload!.slice(9, 17).reverse());
    request.devNOnce = utils.bytesToHexString(this.payload!.slice(17, 19).reverse());
    request.mic = utils.bytesToHexString(this.payload!.slice(19, 23).reverse());
    return new JoinRequestPacket(request);
  }

}