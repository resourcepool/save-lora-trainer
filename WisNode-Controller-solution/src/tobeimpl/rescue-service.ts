import {config} from "./config";
import {
    InterfaceGpsLocation, InternalDeviceSend,
    sendCommand, sendPayload,
    wisnodeSerialcomServiceEventEmitter,
} from "../wisnode-process-service";

// TODO STEP 1.1
export function setModeLoraWan() {
    sendCommand("at+mode=0");
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "set mode to 0");
}

// TODO STEP 1.2
export function setAppEui() {
    const cmd = "at+set_config=app_eui:" + config.app_eui;
    sendCommand(cmd);
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "set app_eui");
}

// TODO STEP 1.2
export function setAppKey() {
    const cmd = "at+set_config=app_key:" + config.app_key;
    sendCommand(cmd);
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "set app_key");
}

// TODO STEP 1.3
export function sendJoinRequest() {
    sendCommand("at+join=otaa");
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "initiate join request");
}

// TODO STEP 1.3
export function isJoinRequestAcceptResponse(response: string) {
    return response === "at+recv=3,0,0";
}

// TODO STEP 2
export function sendGpsLocation(gpsLocation: InterfaceGpsLocation) {

    const gpsData = convertGpsLocationToPayloadData(gpsLocation);
    sendPayload({type: 0, port: 1, data: gpsData});
}

// TODO STEP 2
export function isGpsLocationReceiptConfirmation(response: string) {
    return response === "at+recv=2,0,0";
}

function convertGpsLocationToPayloadData(gpsLocation: InterfaceGpsLocation): string {

    return "01" + "88" + gpsCoordAsHexa(gpsLocation.latitude)
        + gpsCoordAsHexa(gpsLocation.longitude) + gpsLocation.altitudeInCm.toString(16).padStart(6, "0");
}

export function gpsCoordAsHexa(coord: number): string {
    const rawData = Math.trunc(round_number(coord, 4) * 10000);

    let longitudeAsDec = rawData;
    if (coord < 0) {
        longitudeAsDec = (~rawData + 1 >>> 0);
    }
    return longitudeAsDec.toString(16).slice(-6).padStart(6, "0");
}


function round_number(num: number, dec: number): number {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}


