import mqtt, {MqttClient} from 'mqtt';
import Logger from '../log/logger';
import * as mqttRxHandler from './mqtt-rx-handler';
import * as mqttAppRxHandler from './mqtt-application-rx-handler';
import * as mqttLogHandler from './mqtt-log-handler';
import * as mqttJoinRequestMockService from './mqtt-joinrequest-mock-service';
import {config} from "../config";

const GATEWAY_RX_MOCK_TOPIC = "gateway/b3b313374242/stats";
const GATEWAY_RX_TOPIC_REGEX = new RegExp("^gateway/([0-9a-fA-F]+)/rx$");
const GATEWAY_APP_RX_TOPIC_REGEX = new RegExp("^application/[0-9]*/device/([0-9a-fA-F]+)/rx$");
const GATEWAY_STATS_TOPIC_REGEX = new RegExp("^gateway/([0-9a-fA-F]+)/stats$");
const LOG_TOPIC_REGEX = new RegExp("^\\$SYS\\/broker\\/log\\/(\\w+)\\/?(\\w*)$");
const logger = Logger.child({service: "mqtt-service"});

let client: MqttClient;
let sentBytes: number = 0;

export const init = () => {
    client = mqtt.connect(config.mqttClient.host, {
        clientId: config.mqttClient.clientId + Math.floor(Math.random() * 1000),
        username: config.mqttClient.username,
        password: config.mqttClient.password
    });
    client.on('connect', () => {
        client.subscribe("#", (err) => {
            logger.info("Subscribed to #");
        });
        client.subscribe("$SYS/broker/log/#", (err) => {
            logger.info("Subscribed to $SYS/broker/log/#");
        });
        if (!mqttJoinRequestMockService.isStarted()) {
            // Send a dummy join request every 10 seconds
            mqttJoinRequestMockService.init(GATEWAY_RX_MOCK_TOPIC);
        }
    });
    client.on('message', onMessage);
};

export const publish = (topic: string, message: string) => {
    client.publish(topic, message);
};

const onMessage = (topic: string, message: Buffer) => {
    logger.debug("Message received:");
    logger.debug("Topic: " + JSON.stringify(topic));
    logger.debug("Message: " + message.toString());
    if (GATEWAY_RX_TOPIC_REGEX.test(topic)) {
        handleGatewayRxMessage(topic, message);
    } else if (GATEWAY_STATS_TOPIC_REGEX.test(topic)) {
        handleGatewayStatsMessage(topic, message);
    } else if (LOG_TOPIC_REGEX.test(topic)) {
        handleLogMessage(topic, message);
    }else if (GATEWAY_APP_RX_TOPIC_REGEX.test(topic)){
        handleAppRxMessage(topic, message);
    }
};

const handleGatewayStatsMessage = (topic: string, message: Buffer) => {
    logger.debug("Gateway Stats Message received");
};

const handleGatewayRxMessage = (topic: string, message: Buffer) => {
    logger.debug("Gateway Rx Message received");
    sentBytes += message.length;
    mqttRxHandler.handleRxMessage(topic, message);
};


const handleAppRxMessage = (topic: string, message: Buffer) => {
    logger.debug("Application Rx Message received");
    sentBytes += message.length;
    mqttAppRxHandler.handleAppRxMessage(topic, message);
};

const handleLogMessage = (topic: string, message: Buffer) => {
    logger.debug("Log Message received");
    let match: RegExpExecArray = LOG_TOPIC_REGEX.exec(topic)!;
    let logType = match[2];
    switch (logType) {
        case "subscribe":
            mqttLogHandler.handleSubscriptionLogMessage(message);
            break;
        default:
            mqttLogHandler.handleOtherLogMessage(topic, message);
            break;
    }
};
