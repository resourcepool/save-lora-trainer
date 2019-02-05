import Challenge from './Challenge';
import Team from "../team/Team";
import * as teamDao from "../team/team-dao";
import {create, findOne} from "./challenge-dao";
import Logger from "../log/logger";
import * as helper from '../joinrequest/join-request-helper';
import ChallengeResultDto from "../web/services/challenges/dto/ChallengeResultDto";
import JoinRequestPacketDecoder from "../joinrequest/JoinRequestPacketDecoder";
import {HACKER_STEP_JOIN_REQUEST_SUPPORTED} from "../progress/Progress";

const logger = Logger.child({service: "mqtt-log-handler"});
const joinRequestSupportedTag = 'joinrequestsupported';

export const createJoinRequestSupportedChallenge = async (clientId: string): Promise<Challenge | Error> => {
    const team: Team | Error = await teamDao.findByClientId(clientId);
    if (team instanceof Error) {
        logger.warn(`Failed to retrieve team for client: ${clientId}`);
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

export const solveJoinRequestSupportedChallenge = async (result: ChallengeResultDto): Promise<boolean | Error> => {
    const challenge: Challenge | Error = await findOne(result.challengeId!);
    if (challenge instanceof Error) {
        logger.warn(`Failed to retrieve challenge for id: ${result.challengeId}`);
        return challenge;
    }

    let stepValidated = checkJoinRequestSupported(challenge, result);
    if (!stepValidated) {
        return false;
    }
    
    let team: Team | Error = await teamDao.findOne(challenge.teamId!);
    if (team instanceof Error) {
        logger.warn(`Failed to retrieve team: ${challenge.teamId}`);
        return team;
    }
    let step = team.progress.hackerSteps!.filter(s => s.tag === HACKER_STEP_JOIN_REQUEST_SUPPORTED)[0];
    step.validated = true;
    step.timestamp = Date.now();
    return await teamDao.updateProgress(team);
};

const checkJoinRequestSupported = (challenge: Challenge, result: ChallengeResultDto): boolean => {
    if (result.errors && result.errors.length > 0 || !result.content.messages) {
        return false;
    }
    let itemCount = challenge.content.messages.length;
    if (itemCount !== result.content.messages.length) {
        return false;
    }
    for (let i = 0; i < itemCount; i++) {
        let challengeStr = new JoinRequestPacketDecoder(challenge.content.messages[i].topic, challenge.content.messages[i].message);
        let resultSupported = result.content!.messages[i].supported;
        if (resultSupported != challengeStr.isSupported()) {
            return false;
        }
    }
    return true;
};