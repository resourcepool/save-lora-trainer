// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process

import * as wisnodeService from "./node-process-service";
import {
    serialServiceEventEmitter,
} from "./node-process-service";


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

serialServiceEventEmitter.on("cmd-sent", (msg: string) => {
    addLineToDisplay(msg);
});
serialServiceEventEmitter.on("dev-response-raw", (data: string) => {
    displayResponseRaw(data);
});

serialServiceEventEmitter.on("server-response-raw", (data: string) => {
    displayResponseRaw(data);
});

serialServiceEventEmitter.on("allow-send-location",
    () => {
        (document.getElementById("send_location") as HTMLInputElement).disabled = false;
    });

serialServiceEventEmitter.on("reset", () => {
    displayText.textContent = "";
    (document.getElementById("send_location") as HTMLInputElement).disabled = true;
});

function fireCustomCmd() {
    wisnodeService.fireCustomCmd((document.getElementById("custom-cmd") as HTMLInputElement).value);
}

document.getElementById("connect").addEventListener("click", wisnodeService.initConnect);
document.getElementById("send_location").addEventListener("click", wisnodeService.sendLocation);
document.getElementById("fire-custom-cmd").addEventListener("click", fireCustomCmd);
