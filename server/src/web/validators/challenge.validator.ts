
const HEX_STRING = new RegExp('^[A-Fa-f0-9\\:]+$');
export function isValidHexString(str: string): boolean {
    return HEX_STRING.test(str);
}