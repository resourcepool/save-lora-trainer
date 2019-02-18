import JoinRequestBuilder from '../joinrequest/models/JoinRequestBuilder';
import Logger from '../log/logger';
import * as mqttService from './mqtt-service';
import Timeout = NodeJS.Timeout;
import {config} from "../config";

const GATEWAY_STATS_TOPIC_REGEX = new RegExp("^gateway/([0-9a-fA-F]+)/stats$");
const logger = Logger.child({service: "mqtt-joinrequest-mock-service"});

let initialized: boolean;
let targetTopic: string;
let targetGatewayMac: string;
let retries: number = 0;
let loopCallback: Timeout;

export const isStarted = (): boolean => {
    return initialized;
};

export const init = (topic: string) => {
    logger.info("Initializing MQTT Join Request mock");
    // Send a dummy join request every 10 seconds
    let match: RegExpExecArray = GATEWAY_STATS_TOPIC_REGEX.exec(topic)!;
    targetTopic = topic.substr(0, topic.lastIndexOf("/")) + "/rx";
    targetGatewayMac = match[1];
    if (loopCallback) {
        clearInterval(loopCallback);
    }
    loopCallback = setInterval(joinRequestDummy, 10000);
    initialized = true;
    joinRequestDummy();
};

const joinRequestDummy = () => {
    logger.debug("Sending mock Join Request");
    mqttService.publish(targetTopic!, JoinRequestBuilder.builder()
        .appEUI(config.mockDevice.appEUI)
        .appKey(config.mockDevice.appKey)
        .devEUI(config.mockDevice.devEUI)
        .devNOnce(++retries)
        .build(targetGatewayMac!));
};
