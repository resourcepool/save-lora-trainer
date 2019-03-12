import conf from "../conf";

import {
    sendCommand, sendPayload,
    serialServiceEventEmitter,
} from "../node-process-service";


export function setModeLoraWan() {
    // TODO STEP 1.1
    // sendCommand(CHANGEME);
    serialServiceEventEmitter.emit("cmd-sent", "set mode to 0");
}

export function setAppEui() {
    // TODO STEP 1.2
    // sendCommand(CHANGEME);
    serialServiceEventEmitter.emit("cmd-sent", "set app_eui");
}

export function setAppKey() {
    // TODO STEP 1.3
    //sendCommand("CHANGEME");
    serialServiceEventEmitter.emit("cmd-sent", "set app_key");
}

export function sendJoinRequest() {
    // TODO STEP 2
    //sendCommand("CHANGEME");
    serialServiceEventEmitter.emit("cmd-sent", "initiate join request");
}

export function sendGpsLocation(gpsLocation) {
    // TODO STEP 3
    //sendCommand("CHANGEME");
    serialServiceEventEmitter.emit("cmd-sent", "send location");
}

