"use strict";


const waitForExpect = require("wait-for-expect")
const conf = require("../conf");

const rescueService = require("../tobeimpl/rescue-service");

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
let port;
const parser = new Readline({delimiter: "\r\n"});

let dataRx = "initiated";


const onDeviceRx = (data) => {
    // console.log(data);
    dataRx = data;
};

beforeAll(() => {
    port = new SerialPort(conf.tty, {baudRate: 115200});
    port.pipe(parser);
    parser.on('data', onDeviceRx)
}, 5000);

afterAll(() => {
    port.close();
});

test("test mode", async () => {
    jest.setTimeout(10000);

    port.write(rescueService.buildCommandForSetModeLoraWan() + '\r\n');
    await waitForExpect(() => {
        expect(dataRx).toContain("Selected LoraWAN 1.0.2 Region: EU868");
    }, 3000);

}, 10000);

test("test app_eui", async () => {
    jest.setTimeout(10000);

    port.write(rescueService.buildCommandForSetAppEui() + '\r\n');
    port.write('at+get_config=app_eui\r\n')
    await waitForExpect(() => {
        expect(dataRx).toEqual("OK" + conf.appEUI);
    }, 3000);

}, 10000);


test("test app_key", async () => {
    jest.setTimeout(10000);

    port.write(rescueService.buildCommandForSetAppKey() + '\r\n');
    port.write('at+get_config=app_key\r\n');
    await waitForExpect(() => {
        // expect(dataRx).toContain(conf.appKey);
        expect(dataRx).toEqual("OK" + conf.appKey);

    },3000);

}, 10000);


