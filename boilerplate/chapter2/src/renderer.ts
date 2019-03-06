// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process

import * as wisnodeService from "./wisnode-process-service";
import {
    wisnodeSerialcomServiceEventEmitter,
} from "./wisnode-process-service";


const displayText = document.getElementById("wisnode-serial");

function addLineToDisplay(value: string) {
    displayText.textContent += "\r\n" + value;
    displayText.scrollTop = displayText.scrollHeight;
}

function displayCmdSent(msg: string, cmd: string) {
    addLineToDisplay(msg);
    addLineToDisplay("Command : " + cmd);
}

function displayResponseRaw(data: string) {
    addLineToDisplay("Raw Response : " + data);
}

wisnodeSerialcomServiceEventEmitter.on("cmd-sent", (msg) => {
    addLineToDisplay(msg);
});
wisnodeSerialcomServiceEventEmitter.on("dev-response-raw", (data) => {
    displayResponseRaw(data);
});

wisnodeSerialcomServiceEventEmitter.on("server-response-raw", (data) => {
    displayResponseRaw(data);
});

wisnodeSerialcomServiceEventEmitter.on("allow-send-location",
    () => {
        (document.getElementById("send_location") as HTMLInputElement).disabled = false;
    });

wisnodeSerialcomServiceEventEmitter.on("reset", () => {
    displayText.textContent = "";
    (document.getElementById("send_location") as HTMLInputElement).disabled = true;
});

function fireCustomCmd() {
    wisnodeService.fireCustomCmd((document.getElementById("custom-cmd") as HTMLInputElement).value);
}

document.getElementById("connect").addEventListener("click", wisnodeService.initConnect);
document.getElementById("send_location").addEventListener("click", wisnodeService.sendLocation);
document.getElementById("fire-custom-cmd").addEventListener("click", fireCustomCmd);
