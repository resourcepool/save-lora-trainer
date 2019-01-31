const hexStringToByte = (byteAsHexString) => {
  return parseInt(byteAsHexString, 16);
};

const byteToHexString = (byte) => {
  return ((byte & 0xF0) >> 4).toString(16) + (byte & 0x0F).toString(16);
};

const bytesToPrettyHexString = (bytes) => {
  let hex = '';
  for (let byte of bytes.values()) {
    if (hex.length > 0) {
      hex += ':';
    }
    hex += byteToHexString(byte);
  }
  return hex;
};

const SEPARATORS = new RegExp('[-:]', 'g');


const hexStringToBytes = (hexStr) => {
  let str = hexStr.replace(SEPARATORS,'');
  let size = str.length / 2;
  let bytes = new Uint8Array(size);
  for (let i = 0; i < size; ++i) {
    bytes[i] = hexStringToByte(str.substr(2 *  i, 2));
  }
  return bytes;
};

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

module.exports = {
  hexStringToBytes,
  byteToHexString,
  hexStringToByte,
  bytesToPrettyHexString,
  arraysEqual
};