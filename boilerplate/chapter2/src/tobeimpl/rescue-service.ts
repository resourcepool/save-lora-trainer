import {config} from "./config";
import {
    InterfaceGpsLocation, InternalDeviceSend,
    sendCommand, sendPayload,
    wisnodeSerialcomServiceEventEmitter,
} from "../wisnode-process-service";

export function setModeLoraWan() {
    // TODO STEP 1.1
    //sendCommand("CHANGEME");
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "set Lorawan Mode");
}

export function setAppEui() {
    // TODO STEP 1.2
    //sendCommand("CHANGEME");
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "set app_eui");
}

export function setAppKey() {
    // TODO STEP 1.3
    //sendCommand("CHANGEME");
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "set app_key");
}

export function sendJoinRequest() {
    // TODO STEP 2
    //sendCommand("CHANGEME");
    wisnodeSerialcomServiceEventEmitter.emit("cmd-sent", "initiate join request");
}

export function sendGpsLocation(gpsLocation: InterfaceGpsLocation) {
    // TODO STEP 3
    // you can keep using sendCommand(cmd: string) function, or the more specific sendPayload(payload: InternalDeviceSend) one
}

