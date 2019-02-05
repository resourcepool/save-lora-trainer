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
    return false;
  }
  
  /**
   * @returns {{mic: {string}, appEUI: {string}, devNOnce: {string}, devEUI: {string}}}
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
    // TODO Step 2.2
    // Don't forget to look at the method utils#hexStringToBytes()
    return request;
  }

}



module.exports = JoinRequestPacketDecoder;