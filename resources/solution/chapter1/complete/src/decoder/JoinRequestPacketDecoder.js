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
    // TODO Step 2.1
    // hint: be careful, you are scanning all messages from MQTT Broker, some of them do not have a phyPayload. this.payload is then undefined.
    // a message without payload is obviously not a joinRequest.
    return this.payload !== undefined && this.payload.readInt8(0) === 0x00;
  }

  /**
   * @returns {{mic: {string}, appEUI: {string}, devNOnce: {number}, devEUI: {string}}}
   * Example:
   * {
   *   mic: '25311239',
   *   appEui: '12fa34c542ab4782'
   *   devEui: 'ac133246f17c04b2'
   *   devNonce: 1
   * }
   */
  decode() {
    let request = {
      appEUI: null,
      devEUI: null,
      devNOnce: null,
      mic: null
    };
    // TODO Step 2.2
    request.appEUI = utils.bytesToHexString(this.payload.slice(1, 9).reverse());
    request.devEUI = utils.bytesToHexString(this.payload.slice(9, 17).reverse());
    request.devNOnce = this.payload.slice(17, 19).readUInt16LE(0);
    request.mic = utils.bytesToHexString(this.payload.slice(19, 23).reverse());
    return request;
  }

}



module.exports = JoinRequestPacketDecoder;
