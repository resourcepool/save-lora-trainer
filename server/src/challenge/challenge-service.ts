import Challenge from './Challenge';
import Team from "../team/Team";
import {findByDevEUI} from "../team/team-dao";
import {create} from "./challenge-dao";
import Logger from "../log/logger";
import * as helper from '../joinrequest/join-request-helper';

const logger = Logger.child({service: "mqtt-log-handler"});
const joinRequestSupportedTag = 'joinrequestsupported';

export const createJoinRequestSupportedChallenge = async (devEUI: string): Promise<Challenge | Error> => {
    const team: Team | Error = await findByDevEUI(devEUI);
    if (team instanceof Error) {
        logger.warn(`Failed to retrieve team for device: ${devEUI}`);
        return team;
    }
    const content: { messages: { topic: string, message: string }[] } = {
        messages: []
    };
    for (let i = 0; i < 20; i++) {
        content.messages.push(helper.randomRequest());
    }
    const challenge = new Challenge(joinRequestSupportedTag, team, content);
    return await create(challenge);
};
