import mqtt, {MqttClient} from 'mqtt';
import Logger from '../log/logger';
import * as mqttRxHandler from './mqtt-rx-handler';
import * as mqttLogHandler from './mqtt-log-handler';
import * as mqttJoinRequestMockService from './mqtt-joinrequest-mock-service';
import * as winston from "winston";
import {config} from "../config";

const GATEWAY_RX_TOPIC_REGEX = new RegExp("^gateway/([0-9a-fA-F]+)/rx$");
const GATEWAY_STATS_TOPIC_REGEX = new RegExp("^gateway/([0-9a-fA-F]+)/stats$");
const LOG_TOPIC_REGEX = new RegExp("^\\$SYS\\/broker\\/log\\/(\\w+)\\/?(\\w*)$");
const logger = Logger.child({service: "mqtt-service"});

let client: MqttClient;
let sentBytes: number = 0;

export const init = () => {
    client = mqtt.connect('mqtt://5.135.162.148:1883', {clientId: config.mockClient.clientId});
    client.on('connect', () => {
        client.subscribe("#", (err) => {
            logger.info("Subscribed to #");
        });
        client.subscribe("$SYS/broker/log/#", (err) => {
            logger.info("Subscribed to $SYS/broker/log/#");
        });
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
    }
};

const handleGatewayStatsMessage = (topic: string, message: Buffer) => {
    logger.debug("Gateway Stats Message received");
    if (!mqttJoinRequestMockService.isStarted()) {
        // Send a dummy join request every 10 seconds
        mqttJoinRequestMockService.init(topic);
    }
};

const handleGatewayRxMessage = (topic: string, message: Buffer) => {
    logger.debug("Gateway Rx Message received");
    sentBytes += message.length;
    mqttRxHandler.handleRxMessage(topic, message);
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
