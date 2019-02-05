export const ALPHA_NUM_WORD = new RegExp('^\\w[\\w\\-]+$');
export const ALPHA_NUM_WORDS = new RegExp('^\\w[\\s\\w\\-]+$');

export const HEX_STRING = new RegExp('^[A-Fa-f0-9\\:]+$');
export const NUMBER = new RegExp('^\\d+$');

export const isValidHexString = (str: string): boolean => {
    return HEX_STRING.test(str);
};

export const isValidWord = (str: string): boolean => {
    return ALPHA_NUM_WORD.test(str);
};

export const isValidNumber = (str: string): boolean => {
    return NUMBER.test(str);
};