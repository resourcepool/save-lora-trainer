"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const client = mqtt_1.default.connect('mqtt://5.135.162.148:1883');
client.on('connect', function () {
    client.subscribe("#", function (err) {
    });
});
client.on('message', function (topic, message) {
    console.log("HERE");
    // message is Buffer
    console.log(topic.toString());
    let msg = JSON.parse(message.toString());
    console.log(msg.toString());
});
//# sourceMappingURL=index.js.map