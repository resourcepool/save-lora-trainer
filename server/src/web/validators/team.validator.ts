import {ALPHA_NUM_WORD, ALPHA_NUM_WORDS, HEX_STRING} from "./common.validator";


export function isValidTeam(name: string, clientId: string, devEUI: string): boolean {
    return ALPHA_NUM_WORDS.test(name) && ALPHA_NUM_WORD.test(clientId) && HEX_STRING.test(devEUI);
}