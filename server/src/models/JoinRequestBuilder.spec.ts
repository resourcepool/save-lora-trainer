import JoinRequestBuilder from './JoinRequestBuilder';
import * as utils from '../utils';

const validTopic = 'gateway/abcdef0123456789/rx';
const invalidTopic = 'gateway/abcdef0123456789/tx';
const invalidTopic2 = 'gateway/abcdef0123456789/stats';

const validDevEUI = '13:37:00:00:FF:FF:FF:00';
const validAppEUI = '42:42:42:42:42:42:42:42';
const validAppKey = '42:42:42:42:42:42:42:42:42:42:42:42:42:42:42:42';
const validGatewayMac = 'abcdef0123456789';

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

afterEach(() => {
    jest.resetModules()
});

test('join request valid random encode / decode', () => {
    let devEUI = randomValidEUI();
    let appEUI = randomValidEUI();
    let appKey = randomValidKey();
    let mac = randomValidGatewayMAC();
    // Prepare conditions for the first test
    let jr = new JoinRequestBuilder()
        .devNOnce(1)
        .devEUI(devEUI)
        .appEUI(appEUI)
        .appKey(appKey)
        .build(mac);
    console.log(devEUI);
    console.log(appEUI);
    console.log(appKey);
    console.log(jr);
    expect(jr).toBeDefined();
});

test('join request valid random encode / decode 2', () => {
    // Prepare conditions for the first test
    let jr = new JoinRequestBuilder()
        .devNOnce(1)
        .devEUI(validDevEUI)
        .appEUI(validAppEUI)
        .appKey(validAppKey)
        .build(validGatewayMac);
    console.log(jr);
    expect(jr).toBeDefined();
});