const wisnodeService = require("./wisnode-process-service");
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
wisnodeService.serialEventEmitter.on("cmd-sent", (msg) => {
    addLineToDisplay(msg);
});
wisnodeService.serialEventEmitter.on("dev-response-raw", (data) => {
    displayResponseRaw(data);
});
wisnodeService.serialEventEmitter.on("server-response-raw", (data) => {
    displayResponseRaw(data);
});
wisnodeService.serialEventEmitter.on("allow-send-location", () => {
    document.getElementById("send_location").disabled = false;
});
wisnodeService.serialEventEmitter.on("reset", () => {
    displayText.textContent = "";
    document.getElementById("send_location").disabled = true;
});
function fireCustomCmd() {
    wisnodeService.fireCustomCmd(document.getElementById("custom-cmd").value);
}
document.getElementById("connect").addEventListener("click", wisnodeService.initConnect);
document.getElementById("send_location").addEventListener("click", wisnodeService.sendLocation);
document.getElementById("fire-custom-cmd").addEventListener("click", fireCustomCmd);
