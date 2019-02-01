
class JoinRequestPacketDecoder {
  
  constructor(topic, msg) {
    this.topic = topic;
    this.msg = JSON.parse(msg.toString());
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
    return false;
  }
  
  /**
   * @returns {{mic: Uint8Array, appEui: Uint8Array, devNOnce: Uint8Array, devEui: Uint8Array}}
   */
  decode() {
    let request = {
      appEUI: null,
      devEUI: null,
      devNOnce: null,
      mic: null
    };
    // TODO Step 2.2
    return request;
  }

}



module.exports = JoinRequestPacketDecoder;