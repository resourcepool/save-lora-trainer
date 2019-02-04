import Logger from '../log/logger';
import Team from "../models/Team";

const logger = Logger.child({ service: 'tracking'});

export const validateMQTTSubscription = (team: Team) => {
    logger.info("MQTT Subscription successful for team " + team.name);
};