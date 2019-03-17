import JoinRequestPacketDecoder from "../joinrequest/models/JoinRequestPacketDecoder";
import Logger from '../log/logger';

const logger = Logger.child({service: "mqtt-rx-handler"});
import * as progressService from '../progress/progress-service';
import Team from "../team/models/Team";
import * as teamDao from "../team/team-dao";
import {config} from "../config";
import {normalizeHexString} from "../utils";

export const handleRxMessage = async (topic: string, message: Buffer) => {
    logger.info("Will handle Rx Message");
    // Check Join Request Packets
    let joinRequestPacketDecoder = new JoinRequestPacketDecoder(topic, message);
    if (joinRequestPacketDecoder.isSupported()) {
        let decoded = joinRequestPacketDecoder.decode();
        logger.info("Join Request Received: " + JSON.stringify(decoded));
        // Ignore mock device messages
        if (normalizeHexString(decoded.appEUI) === normalizeHexString(config.mockDevice.appEUI)) {
            logger.debug("Join Request was a mock. Will bypass");
            return;
        }
        let success = await updateProgressWithDevEUI(progressService.validateJoinRequestSent, decoded.devEUI);
        if (success) {
            logger.info(`Join request sent successfully for device ${decoded.devEUI}`);
        }
    } else {
        logger.debug("The Message is not a join request. Will be ignored");
    }
};

const updateProgressWithDevEUI = async (func: (team: Team) => Promise<boolean>, devEUI: string): Promise<boolean> => {
    let team = await teamDao.findByDevEUI(devEUI);
    if (!team) {
        logger.warn(`Failed to retrieve team for: ${devEUI}`);
        return false;
    }
    let result = await func(team);
    if (!result) {
        logger.warn(`Failed to update progress for team: ${team.name}`);
        return false;
    }
    return true;
};
