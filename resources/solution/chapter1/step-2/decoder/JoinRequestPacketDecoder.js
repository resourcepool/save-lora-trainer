const utils = require('../utils');

class JoinRequestPacketDecoder {

  constructor(topic, msg) {
    this.topic = topic;
    try {
      this.msg = JSON.parse(msg.toString());
    } catch (e) {
      // Someone sent a weird payload. Not supposed to happen.
    }

    if (this.msg && this.msg.phyPayload) {
      this.payload = Buffer.from(this.msg.phyPayload, 'base64');
    }
  }

  /**
   * @returns {boolean}
   * true if the message is indeed a join-request packet
   * false otherwise
   */
  isSupported() {
    return this.payload && this.payload.readInt8(0) === 0x00;
  }

  /**
   * @returns {{mic: {string}, appEUI: {string}, devNOnce: {number}, devEUI: {string}}}
   * Example:
   * {
   *   mic: [25, 31, 12, 39],
   *   appEui: [66, 66, 66, 66, 66, 66, 66, 66], <=> 42:42:42:42:42:42:42:42
   *   devEui: [0D, 25, 00, 00, AC, 1F, C2, 0A] <=> 13:37:00:00:
   * }
   */
  decode() {
    let request = {
      appEUI: null,
      devEUI: null,
      devNOnce: null,
      mic: null
    };
    request.appEUI = utils.bytesToHexString(this.payload.slice(1, 9).reverse());
    request.devEUI = utils.bytesToHexString(this.payload.slice(9, 17).reverse());
    request.devNOnce = this.payload.slice(17, 19).readUInt16LE(0);
    request.mic = utils.bytesToHexString(this.payload.slice(19, 23).reverse());
    return request;
  }

}



module.exports = JoinRequestPacketDecoder;
