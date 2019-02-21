import EventEmitter = require("events");
import SerialPort = require("serialport");
import {config} from "./config";
import * as rescueService from "./tobeimpl/rescue-service";

const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: "\r\n"});
const port = new SerialPort("/dev/ttyUSB0", {baudRate: 115200});
port.pipe(parser);
parser.on("data", processReturnFromDevice);

class WisnodeSerialcomServiceEventEmitter extends EventEmitter {
}

export const wisnodeSerialcomServiceEventEmitter = new WisnodeSerialcomServiceEventEmitter();

enum ProcessStep {
    IDLE,
    SETTING_MODE,
    SETTING_APP_KEY,
    SETTING_APP_EUI,
    STARTING_JOIN_REQUEST,
    WAITING_JOIN_REQUEST_ACCEPTATION,
    CUSTOM,
}

let currentStep: ProcessStep = ProcessStep.IDLE;

export async function initConnect() {
    console.log("init connection");
    currentStep = ProcessStep.IDLE;
    sendCommand("at+reset=0");
    await delay(500);
    currentStep = ProcessStep.SETTING_MODE;
    processNextStep();
}

export function sendLocation() {
    rescueService.sendGpsLocation({
        latitude: config.latitude,
        longitude: config.longitude,
        altitudeInCm: config.altitudeAsCm,
    });
}

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function processReturnFromDevice(data: string) {
    if (data === "Welcome to RAK811") {
        wisnodeSerialcomServiceEventEmitter.emit("reset");
        wisnodeSerialcomServiceEventEmitter.emit("server-response-raw", "resetting...");
    }
    console.log(data);
    wisnodeSerialcomServiceEventEmitter.emit("server-response-raw", data);
    if (data === "OK") {
        currentStep += 1;
        console.log(ProcessStep[currentStep]);
        processNextStep();

    } else if (rescueService.isJoinRequestAcceptResponse(data)) {
        wisnodeSerialcomServiceEventEmitter.emit("server-response-raw",
            "Congrats! you're connected to loraServer");
        wisnodeSerialcomServiceEventEmitter.emit("allow-send-location");
    } else if (rescueService.isGpsLocationReceiptConfirmation(data)) {
        wisnodeSerialcomServiceEventEmitter.emit("server-response-raw",
            "GPS Location has been successfully sent. Congrats! HELP IS ON ITS WAY !!");
    }
}

function processNextStep() {
    switch (currentStep) {
        case ProcessStep.SETTING_MODE:
            rescueService.setModeLoraWan();
            break;
        case ProcessStep.SETTING_APP_EUI:
            rescueService.setAppEui();
            break;
        case ProcessStep.SETTING_APP_KEY:
            rescueService.setAppKey();
            break;
        case ProcessStep.STARTING_JOIN_REQUEST:
            rescueService.sendJoinRequest();
            break;
    }
}


export function sendCommand(cmd: string) {
    const cmdCompleted = cmd + "\r\n";
    port.write(cmdCompleted);
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", cmd);
}


export interface InterfaceGpsLocation {
    latitude: number;
    longitude: number;
    altitudeInCm: number;
}

export interface InternalDeviceSend {
    type: ComSendType;
    port: number;
    data: string;
}

export enum ComSendType {
    TYPE_UNCONFIRMED = 0,
    TYPE_CONFIRMED = 1,
}

export function fireCustomCmd(value: string) {
    currentStep = ProcessStep.CUSTOM;
    if (value.startsWith("at+")) {
        sendCommand(value);
    } else {
        wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "invalid AT command...");
    }
}
