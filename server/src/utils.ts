const hexStringToByte = (byteAsHexString: string): number => {
  return parseInt(byteAsHexString, 16);
};

const byteToHexString = (byte: number): string => {
  return ((byte & 0xF0) >> 4).toString(16) + (byte & 0x0F).toString(16);
};

const bytesToPrettyHexString = (bytes: number[]): string => {
  let hex = '';
  for (let byte of bytes.values()) {
    if (hex.length > 0) {
      hex += ':';
    }
    hex += byteToHexString(byte);
  }
  return hex;
};

const bytesToHexString = (bytes: Uint8Array): string => {
  let hex = '';
  for (let byte of bytes.values()) {
    hex += byteToHexString(byte);
  }
  return hex;
};

const SEPARATORS = new RegExp('[-:]', 'g');


const hexStringToBytes = (hexStr: string): Uint8Array => {
  let str = hexStr.replace(SEPARATORS,'');
  let size = str.length / 2;
  let bytes = new Uint8Array(size);
  for (let i = 0; i < size; ++i) {
    bytes[i] = hexStringToByte(str.substr(2 *  i, 2));
  }
  return bytes;
};

const arraysEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export {
  hexStringToBytes,
  byteToHexString,
  hexStringToByte,
  bytesToPrettyHexString,
  bytesToHexString,
  arraysEqual
};