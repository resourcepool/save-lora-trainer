
class PacketDecoder {
  constructor(msg) {
    this.msg = msg;
    if (this.msg && this.msg.phyPayload) {
      this.payload = Buffer.from(this.msg.phyPayload, 'base64');
    }
  }

  isJoinRequest() {
    if (!this.payload) {
      return false;
    }
    if (this.payload.length < 5) {
      return false;
    }
    let prefix = this.payload.readInt8(0);
    return prefix === 0x00;
  }
  
  toBytes(buffer) {
    return Uint8Array.from(buffer);
  }

  decodeJoinRequest() {
    let request = {
      appEui: null,
      devEui: null,
      devNOnce: null,
      mic: null
    };
    request.appEui = this.toBytes(this.payload.slice(1, 9).reverse());
    request.devEui = this.toBytes(this.payload.slice(9, 17).reverse());
    request.devNOnce = this.toBytes(this.payload.slice(17, 19).reverse());
    request.mic = this.toBytes(this.payload.slice(19, 23).reverse());
    return request;
  }


}



module.exports = PacketDecoder;