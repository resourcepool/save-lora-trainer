import {config} from "./config";
import {
    InterfaceGpsLocation, InternalDeviceSend,
    sendCommand, sendPayload,
    wisnodeSerialcomServiceEventEmitter,
} from "../wisnode-process-service";

// TODO STEP 1.1
export function setModeLoraWan() {
    // use sendCommand(cmd: string)  function
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "Set Lorawan Mode");
}

// TODO STEP 1.2
export function setAppEui() {
    // use sendCommand(cmd: string)  function
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "set app_eui");
}

// TODO STEP 1.2
export function setAppKey() {
    // use sendCommand(cmd: string)  function
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "set app_key");
}

// TODO STEP 1.3
export function sendJoinRequest() {
    // use sendCommand(cmd: string)  function
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "initiate join request");
}

// TODO STEP 1.3
export function isJoinRequestAcceptResponse(response: string) {
    return false;
}

// TODO STEP 2
export function sendGpsLocation(gpsLocation: InterfaceGpsLocation) {
    // you can keep using sendCommand(cmd: string) function, or the more specific sendPayload(payload: InternalDeviceSend) one
}

// TODO STEP 2
export function isGpsLocationReceiptConfirmation(response: string) {
    return false;
}

