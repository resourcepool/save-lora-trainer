import Logger from '../log/logger';
import * as progressService from '../progress/progress-service';
import * as teamDao from '../team/team-dao';
import Team from "../team/models/Team";
import {config} from "../config";

const logger = Logger.child({service: "mqtt-log-handler"});

export const MOSQUITTO_CLIENT_CONNECTION_REGEX: RegExp = new RegExp("^\\d+: New client connected from (?:[\\d]{1,3}.){3}.(?:[\\d]{1,3}) as ([\\w\\-]+) \\(.+\\)\\.$");
export const MOSQUITTO_CLIENT_SUBSCRIPTION_REGEX: RegExp = new RegExp("^\\d+: ([\\w\\-]+) \\d+ (.*)$");

export const handleOtherLogMessage = async (topic: string, message: Buffer) => {
    let msgStr = message.toString();
    if (MOSQUITTO_CLIENT_CONNECTION_REGEX.test(msgStr)) {
        let match: RegExpExecArray = MOSQUITTO_CLIENT_CONNECTION_REGEX.exec(msgStr)!;
        let clientId: string = match[1];
        // Ignore mock client messages
        if (clientId.startsWith(config.mockClient.clientId)) {
            return;
        }
        let success = await updateProgressWithClientId(progressService.validateMQTTConnect, clientId);
        if (success) {
            logger.info(`Connection success for: ${clientId}`);
        }
    }
};

export const handleSubscriptionLogMessage = async (message: Buffer) => {
    let match: RegExpExecArray = MOSQUITTO_CLIENT_SUBSCRIPTION_REGEX.exec(message.toString())!;
    if (!match) {
        logger.warn("Couldn't parse subscription log message correctly");
        return;
    }
    let clientId = match[1];
    let topicSubscribed = match[2];
    // Ignore mock client messages
    if (clientId.startsWith(config.mockClient.clientId)) {
        return;
    }
    let success = await updateProgressWithClientId(progressService.validateMQTTSubscription, clientId);
    if (success) {
        logger.info(`Subscription success for: ${clientId} on topic ${topicSubscribed}`);
    }
};

const updateProgressWithClientId = async (func: (team: Team) => Promise<boolean>, clientId: string): Promise<boolean> => {
    let team = await teamDao.findByClientId(clientId);
    if (!team) {
        logger.warn(`Failed to retrieve team for: ${clientId}`);
        return false;
    }
    let result = await func(team);
    if (!result) {
        logger.warn(`Failed to update progress for team: ${team.name}`);
        return false;
    }
    return true;
};
