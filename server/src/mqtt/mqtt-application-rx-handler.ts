import JoinRequestPacketDecoder from "../joinrequest/models/JoinRequestPacketDecoder";
import Logger from '../log/logger';

const logger = Logger.child({service: "mqtt-rx-handler"});
import * as progressService from '../progress/progress-service';
import Team from "../team/models/Team";
import * as teamDao from "../team/team-dao";
import {config} from "../config";
import {normalizeHexString} from "../utils";
import GpsLocationPacketDecoder from "../gpslocation/models/GpsLocationPacketDecoder";

export const handleAppRxMessage = async (topic: string, message: Buffer) => {

    // Check GpsLocationPacket
    let gpsLocationPacketDecoder = new GpsLocationPacketDecoder(topic, message);
    if (gpsLocationPacketDecoder.isSupported()) {
        let decoded = gpsLocationPacketDecoder.decode();
        logger.info("GpsLocation Received: " + JSON.stringify(decoded));
        let success = await updateProgressWithDevEUI(progressService.validateGpsLocationReceived, decoded.devEUI, {lat: decoded.latitude, lng: decoded.longitude});
        if (success) {
            logger.info(`GpsLocation sent successfully for device ${decoded.devEUI}`);
        }
    }
};

const updateProgressWithDevEUI = async (func: (team: Team) => Promise<boolean>, devEUI: string, location: {lat: number, lng: number}): Promise<boolean> => {
    let team = await teamDao.findByDevEUI(devEUI);
    if (!team) {
        logger.warn(`Failed to retrieve team for: ${devEUI}`);
        return false;
    }
    if (team.secretLocation!.lat !== location.lat || team.secretLocation!.lng !== location.lng) {
        logger.warn(`Device location was not right: ${devEUI}, got (${location.lng}, ${location.lat}), expected (${team.secretLocation!.lng}, ${team.secretLocation!.lat})`);
        return false;
    }
    let result = await func(team);
    if (!result) {
        logger.warn(`Failed to update progress for team: ${team.name}`);
        return false;
    }
    return true;
};
