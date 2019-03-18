const wisnodeService = require("./wisnode-process-service");
const rescueService = require("./tobeimpl/rescue-service");
const serialComService = require("./serial-com");
const displayText = document.getElementById("wisnode-serial");
const addLineToDisplay = (value) => {
    displayText.textContent += "\r\n" + value;
    displayText.scrollTop = displayText.scrollHeight;
};
const displayResponseRaw = (data) => {
    addLineToDisplay("Raw Response : " + data);
};
serialComService.serialEventEmitter.on("cmd-sent", (msg) => {
    addLineToDisplay(msg);
});
serialComService.serialEventEmitter.on("dev-response-raw", (data) => {
    displayResponseRaw(data);
});
serialComService.serialEventEmitter.on("server-response-raw", (data) => {
    displayResponseRaw(data);
});
serialComService.serialEventEmitter.on("allow-send-location", () => {
    document.getElementById("send_location").disabled = false;
});
serialComService.serialEventEmitter.on("reset", () => {
    displayText.textContent = "";
    document.getElementById("send_location").disabled = true;
});
const fireCustomCmd = () => {
    wisnodeService.fireCustomCmd(document.getElementById("custom-cmd").value);
};

document.getElementById("connect").addEventListener("click", wisnodeService.initConnect);
document.getElementById("send_location").addEventListener("click", rescueService.sendGpsLocation);
document.getElementById("fire-custom-cmd").addEventListener("click", fireCustomCmd);
document.getElementById("logo_takima").addEventListener("click", wisnodeService.debug);