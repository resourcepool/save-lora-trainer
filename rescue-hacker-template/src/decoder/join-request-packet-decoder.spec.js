const modulePath = './join-request-packet-decoder';


const validTopic = 'gateway/abcdef0123456789/rx';
const invalidTopic = 'gateway/abcdef0123456789/tx';
const invalidTopic2 = 'gateway/abcdef0123456789/stats';
const wrongMhdrMessage = {"rxInfo":{"mac":"abcdef0123456789","time":"2019-02-05T11:04:36.410Z","timeSinceGPSEpoch":"342612h4m36.410s","timestamp":1549364676,"frequency":867300000,"channel":0,"rfChain":0,"crcStatus":1,"codeRate":"5/5","rssi":-102,"loRaSNR":-19,"size":25,"dataRate":{"modulation":"LORA","spreadFactor":12,"bandwidth":125},"board":0,"antenna":0},"phyPayload":"AUJCQkJCQkJCAP///wAANxMBAOZkdIg="};
const validMessage =  {"rxInfo":{"mac":"c5d162329d12fb5c","time":"2019-02-05T11:04:36.394Z","timeSinceGPSEpoch":"342612h4m36.394s","timestamp":1549364676,"frequency":867300000,"channel":0,"rfChain":0,"crcStatus":1,"codeRate":"5/5","rssi":-92,"loRaSNR":-19,"size":25,"dataRate":{"modulation":"LORA","spreadFactor":12,"bandwidth":125},"board":0,"antenna":0},"phyPayload":"AEvKMb6JWFv321eME8sz8kQBANapY24="};
const validMessageDevEUI = "44:f2:33:cb:13:8c:57:db";
const validMessageAppEUI = "f7:5b:58:89:be:31:ca:4b";
const validMessageAppKey = "09:af:41:6f:bc:04:03:91:a1:d3:0f:fd:a3:b4:b2:e8";
const validMessageDevNonce = "6e63a9d6";
const validMessage2 = {"rxInfo":{"mac":"b827ebfffe66de4b","time":"2019-02-05T11:05:06.397Z","timeSinceGPSEpoch":"342612h5m6.397s","timestamp":1549364706,"frequency":867300000,"channel":0,"rfChain":0,"crcStatus":1,"codeRate":"5/5","rssi":-104,"loRaSNR":-19,"size":25,"dataRate":{"modulation":"LORA","spreadFactor":12,"bandwidth":125},"board":0,"antenna":0},"phyPayload":"AEJCQkJCQkJCAP///wAANxMWAIlEpVs="};
const validDevEUI = '13:37:00:00:FF:FF:FF:00';
const validAppEUI = '42:42:42:42:42:42:42:42';
const validAppKey = '42:42:42:42:42:42:42:42:42:42:42:42:42:42:42:42';
const validDevNonce = 16;
const validMic = 'e4f62fcf';

afterEach(() => {
  jest.resetModules()
});

test('join request invalid topic', () => {
  // Prepare conditions for the first test
  const Decoder = require(modulePath);
  let d = new Decoder(invalidTopic, {});
  expect(d.isSupported()).toBeFalsy();
  d = new Decoder(invalidTopic2, {});
  expect(d.isSupported()).toBeFalsy();
});


test('join request invalid payload', () => {
  // Prepare conditions for the first test
  const Decoder = require(modulePath);
  let d = new Decoder(validTopic, null);
  expect(d.isSupported()).toBeFalsy();
  d = new Decoder(validTopic, {});
  expect(d.isSupported()).toBeFalsy();
  d = new Decoder(validTopic, {phyPayload: true});
  expect(d.isSupported()).toBeFalsy();
});

test('join request wrong mhdr', () => {
  // Prepare conditions for the first test
  const Decoder = require(modulePath);
  let d = new Decoder(validTopic, wrongMhdrMessage);
  expect(d.isSupported()).toBeFalsy();
});

test('join request valid 1', () => {
  // Prepare conditions for the first test
  const Decoder = require(modulePath);
  let d = new Decoder(validTopic, validMessage);
  expect(d.isSupported()).toBeTruthy();
  let decoded = d.decode();
  expect(decoded).toBeDefined();
  expect(decoded).toBeDefined();

});

test('join request support false', () => {
  // Prepare conditions for the second test
  const fn = () => require(modulePath)
  expect(fn).toThrow()
});