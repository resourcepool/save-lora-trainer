const ALPHA_NUM_WORD = new RegExp('^\\w[\\w\\-]+$');
const HEX_STRING = new RegExp('^[A-Fa-f0-9\\:]+$');
const NUMBER = new RegExp('^\\d+$');

export function isValidHexString(str: string): boolean {
    return HEX_STRING.test(str);
}

export function isValidName(str: string): boolean {
    return ALPHA_NUM_WORD.test(str);
}

export function isValidNumber(str: string): boolean {
    return NUMBER.test(str);
}