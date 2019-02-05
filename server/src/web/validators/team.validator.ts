
const ALPHA_NUM_WORD = new RegExp('^\\w[\\w\\-]+$');
const ALPHA_NUM_WORDS = new RegExp('^\\w[\\s\\w\\-]+$');
const HEX_STRING = new RegExp('^[A-Fa-f0-9\\:]+$');
export function isValidTeam(name: string, clientId: string, devEUI: string): boolean {
    return ALPHA_NUM_WORDS.test(name) && ALPHA_NUM_WORD.test(clientId) && HEX_STRING.test(devEUI);
}