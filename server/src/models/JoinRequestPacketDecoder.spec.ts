import Decoder from './JoinRequestPacketDecoder';
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

const wrongMhdrMessage = {"rxInfo":{"mac":"abcdef0123456789","time":"2019-02-05T11:04:36.410Z","timeSinceGPSEpoch":"342612h4m36.410s","timestamp":1549364676,"frequency":867300000,"channel":0,"rfChain":0,"crcStatus":1,"codeRate":"5/5","rssi":-102,"loRaSNR":-19,"size":25,"dataRate":{"modulation":"LORA","spreadFactor":12,"bandwidth":125},"board":0,"antenna":0},"phyPayload":"AUJCQkJCQkJCAP///wAANxMBAOZkdIg="};

const validMessage =  {"rxInfo":{"mac":"c5d162329d12fb5c","time":"2019-02-05T11:04:36.394Z","timeSinceGPSEpoch":"342612h4m36.394s","timestamp":1549364676,"frequency":867300000,"channel":0,"rfChain":0,"crcStatus":1,"codeRate":"5/5","rssi":-92,"loRaSNR":-19,"size":25,"dataRate":{"modulation":"LORA","spreadFactor":12,"bandwidth":125},"board":0,"antenna":0},"phyPayload":"AEvKMb6JWFv321eME8sz8kQBANapY24="};
const validMessageDevEUI = "44:f2:33:cb:13:8c:57:db";
const validMessageAppEUI = "f7:5b:58:89:be:31:ca:4b";
const validMessageDevNonce = 1;
const validMessageMic = "6e63a9d6";

const validMessage2 = {"rxInfo":{"mac":"b827ebfffe66de4b","time":"2019-02-05T11:05:06.397Z","timeSinceGPSEpoch":"342612h5m6.397s","timestamp":1549364706,"frequency":867300000,"channel":0,"rfChain":0,"crcStatus":1,"codeRate":"5/5","rssi":-104,"loRaSNR":-19,"size":25,"dataRate":{"modulation":"LORA","spreadFactor":12,"bandwidth":125},"board":0,"antenna":0},"phyPayload":"AEJCQkJCQkJCAP///wAANxMWAIlEpVs="};
const validMessage2DevNonce = 0x0016;
const validMessage2Mic = '5ba54489';

afterEach(() => {
    jest.resetModules()
});

test('join request invalid topic', () => {
    // Prepare conditions for the first test
    let d = new Decoder(invalidTopic, Buffer.alloc(0));
    expect(d.isSupported()).toBeFalsy();
    d = new Decoder(invalidTopic2, Buffer.alloc(0));
    expect(d.isSupported()).toBeFalsy();
});


test('join request invalid payload', () => {
    // Prepare conditions for the first test
    let d = new Decoder(validTopic, Buffer.alloc(0));
    expect(d.isSupported()).toBeFalsy();
    d = new Decoder(validTopic, Buffer.from("{}", 'utf8'));
    expect(d.isSupported()).toBeFalsy();
    expect(() => new Decoder(validTopic, Buffer.from(JSON.stringify({phyPayload: true}), 'utf8'))).toThrow();
});

test('join request wrong mhdr', () => {
    // Prepare conditions for the first test
    let d = new Decoder(validTopic, Buffer.from(JSON.stringify(wrongMhdrMessage), 'utf8'));
    expect(d.isSupported()).toBeFalsy();
});

test('join request valid 1', () => {
    // Prepare conditions for the first test
    let d = new Decoder(validTopic, Buffer.from(JSON.stringify(validMessage), 'utf8'));
    expect(d.isSupported()).toBeTruthy();
    let decoded = d.decode();
    expect(decoded).toBeDefined();
    expect(decoded.devEUI).toBe(utils.normalizeHexString(validMessageDevEUI));
    expect(decoded.appEUI).toBe(utils.normalizeHexString(validMessageAppEUI));
    expect(decoded.devNOnce).toBe(validMessageDevNonce);
    expect(decoded.mic).toBe(validMessageMic);

});

test('join request valid 2', () => {
    // Prepare conditions for the first test
    let d = new Decoder(validTopic, Buffer.from(JSON.stringify(validMessage2), 'utf8'));
    expect(d.isSupported()).toBeTruthy();
    let decoded = d.decode();
    expect(decoded).toBeDefined();
    expect(decoded.devEUI).toBe(utils.normalizeHexString(validDevEUI));
    expect(decoded.appEUI).toBe(utils.normalizeHexString(validAppEUI));
    expect(decoded.devNOnce).toBe(validMessage2DevNonce);
    expect(decoded.mic).toBe(validMessage2Mic);

});