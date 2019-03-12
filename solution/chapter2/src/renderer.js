// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process

import * as wisnodeService from "./node-process-service";
import {
    serialEventEmitter,
} from "./node-process-service";


const displayText = document.getElementById("wisnode-serial");

function addLineToDisplay(value) {
    displayText.textContent += "\r\n" + value;
    displayText.scrollTop = displayText.scrollHeight;
}

function displayCmdSent(msg, cmd) {
    addLineToDisplay(msg);
    addLineToDisplay("Command : " + cmd);
}

function displayResponseRaw(data) {
    addLineToDisplay("Raw Response : " + data);
}

serialEventEmitter.on("cmd-sent", (msg) => {
    addLineToDisplay(msg);
});
serialEventEmitter.on("dev-response-raw", (data) => {
    displayResponseRaw(data);
});

serialEventEmitter.on("server-response-raw", (data) => {
    displayResponseRaw(data);
});

serialEventEmitter.on("allow-send-location",
    () => {
        (document.getElementById("send_location") as HTMLInputElement).disabled = false;
    });

serialEventEmitter.on("reset", () => {
    displayText.textContent = "";
    (document.getElementById("send_location") as HTMLInputElement).disabled = true;
});

function fireCustomCmd() {
    wisnodeService.fireCustomCmd((document.getElementById("custom-cmd") as HTMLInputElement).value);
}

document.getElementById("connect").addEventListener("click", wisnodeService.initConnect);
document.getElementById("send_location").addEventListener("click", wisnodeService.sendLocation);
document.getElementById("fire-custom-cmd").addEventListener("click", fireCustomCmd);
