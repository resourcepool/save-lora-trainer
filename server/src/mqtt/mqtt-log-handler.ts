import Logger from '../log/logger';
const logger = Logger.child({service: "mqtt-log-handler"});

export const MOSQUITTO_CLIENT_CONNECTION_REGEX: RegExp = new RegExp("^\\d+: New client connected from (?:[\\d]{1,3}.){3}.(?:[\\d]{1,3}) as ([\\w\\-]+) \\(.+\\)\\.$");
export const MOSQUITTO_CLIENT_SUBSCRIPTION_REGEX: RegExp = new RegExp("^\\d+: ([\\w\\-]+) \\d+ (.*)$");

export const handleOtherLogMessage = (topic: string, message: Buffer) => {
    let msgStr = message.toString();
    if (MOSQUITTO_CLIENT_CONNECTION_REGEX.test(msgStr)) {
        let match: RegExpExecArray = MOSQUITTO_CLIENT_CONNECTION_REGEX.exec(msgStr)!;
        let clientId: string = match[1];
        logger.info(`Connection success for: ${clientId}`);
    }
};

export const handleSubscriptionLogMessage = (message: Buffer) => {
    let match: RegExpExecArray = MOSQUITTO_CLIENT_SUBSCRIPTION_REGEX.exec(message.toString())!;
    if (!match) {
        logger.warn("Couldn't parse subscription log message correctly");
        return;
    }
    let clientId = match[1];
    let topicSubscribed = match[2];
    logger.info(`Subscription success for: ${clientId} on topic ${topicSubscribed}`);
};