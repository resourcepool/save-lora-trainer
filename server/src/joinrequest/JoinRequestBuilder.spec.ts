import JoinRequestBuilder from './JoinRequestBuilder';
import * as utils from '../utils';
import JoinRequestPacketDecoder from "./JoinRequestPacketDecoder";

const validTopic = 'gateway/abcdef0123456789/rx';

const randomValidGatewayMAC = () => {
    let numbers: number[] = Array.from({length: 8}, () => Math.floor(Math.random() * 256));
    return utils.bytesToHexString(Uint8Array.from(numbers));
};

const randomValidEUI = () => {
    let numbers: number[] = Array.from({length: 8}, () => Math.floor(Math.random() * 256));
    return utils.bytesToPrettyHexString(numbers);
};

const randomValidKey = () => {
    let numbers: number[] = Array.from({length: 16}, () => Math.floor(Math.random() * 256));
    return utils.bytesToPrettyHexString(numbers);
};

const randomDevNOnce = () => {
    let numbers: number[] = Array.from({length: 2}, () => Math.floor(Math.random() * 256));
    return parseInt(utils.bytesToHexString(Uint8Array.from(numbers)), 16);
};

afterEach(() => {
    jest.resetModules()
});

test('join request valid random encode / decode', () => {
    for (let i = 0; i < 100; i++) {
        let devEUI = randomValidEUI();
        let appEUI = randomValidEUI();
        let appKey = randomValidKey();
        let mac = randomValidGatewayMAC();
        let devNOnce = randomDevNOnce();
        // Prepare conditions for the first test
        let jr = new JoinRequestBuilder()
            .devNOnce(devNOnce)
            .devEUI(devEUI)
            .appEUI(appEUI)
            .appKey(appKey)
            .build(mac);
        expect(jr).toBeDefined();
        let decodedJr = new JoinRequestPacketDecoder(validTopic, Buffer.from(jr, 'utf8')).decode();
        expect(decodedJr.devEUI).toBe(utils.normalizeHexString(devEUI));
        expect(decodedJr.appEUI).toBe(utils.normalizeHexString(appEUI));
        expect(decodedJr.devNOnce).toBe(devNOnce);    
    }
});