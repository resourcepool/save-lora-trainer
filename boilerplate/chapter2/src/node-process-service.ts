import EventEmitter = require("events");
import SerialPort = require("serialport");
import {config} from "./tobeimpl/config";
import * as rescueService from "./tobeimpl/rescue-service";

const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: "\r\n"});
const port = new SerialPort(config.tty, {baudRate: 115200});
port.pipe(parser);
parser.on("data", processReturnFromDevice);

export const serialServiceEventEmitter = new EventEmitter();

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
        serialServiceEventEmitter.emit("reset");
        serialServiceEventEmitter.emit("server-response-raw", "resetting...");
    }
    console.log(data);
    serialServiceEventEmitter.emit("server-response-raw", data);
    if (data === "OK") {
        currentStep += 1;
        console.log(ProcessStep[currentStep]);
        processNextStep();

    } else if (isJoinRequestAcceptResponse(data)) {
        serialServiceEventEmitter.emit("server-response-raw",
            "Congrats! you're connected to loraServer");
        serialServiceEventEmitter.emit("allow-send-location");
    } else if (isGpsLocationReceiptConfirmation(data)) {
        serialServiceEventEmitter.emit("server-response-raw",
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
    serialServiceEventEmitter.emit("cmd-sent", cmd);
}

export function sendPayload(payload: InternalDeviceSend) {
    const cmd = "at+send=" + payload.type + "," + payload.port + "," + payload.data;
    sendCommand(cmd);
}

export function isJoinRequestAcceptResponse(response: string) {
    return response === "at+recv=3,0,0";
}

export function isGpsLocationReceiptConfirmation(response: string) {
    return response === "at+recv=2,0,0";
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
        serialServiceEventEmitter.emit("cmd-sent", "invalid AT command...");
    }
}
