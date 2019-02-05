import JoinRequestBuilder from '../joinrequest/models/JoinRequestBuilder';
import Logger from '../log/logger';
import * as mqttService from './mqtt-service';
import Timeout = NodeJS.Timeout;

const GATEWAY_STATS_TOPIC_REGEX = new RegExp("^gateway/([0-9a-fA-F]+)/stats$");
const DUMMY_APP_EUI = "42:42:42:42:42:42:42:42";
const DUMMY_APP_KEY = "2E:A2:9C:4F:54:15:A0:0C:CA:4A:CE:B3:F2:B2:44:69";
const DUMMY_DEV_EUI = "13:37:00:00:FF:FF:FF:00";
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
    joinRequestDummy();
};

const joinRequestDummy = () => {
    logger.debug("Sending mock Join Request");
    mqttService.publish(targetTopic!, JoinRequestBuilder.builder()
        .appEUI(DUMMY_APP_EUI)
        .appKey(DUMMY_APP_KEY)
        .devEUI(DUMMY_DEV_EUI)
        .devNOnce(++retries)
        .build(targetGatewayMac!));
};