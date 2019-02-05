import Challenge from './Challenge';
import Team from "../team/Team";
import * as teamDao from "../team/team-dao";
import * as challengeDao from "./challenge-dao";
import Logger from "../log/logger";
import * as helper from '../joinrequest/join-request-helper';
import ChallengeResultDto from "../web/services/challenges/dto/ChallengeResultDto";
import JoinRequestPacketDecoder from "../joinrequest/JoinRequestPacketDecoder";
import * as progressService from '../progress/progress-service';

const logger = Logger.child({service: "challenge-service"});

const CHALLENGE_TAG_JOIN_REQUEST_SUPPORTED = 'joinrequestsupported';
const CHALLENGE_TAG_JOIN_REQUEST_DECODE = 'joinrequestdecode';

export const createJoinRequestSupportedChallenge = async (clientId: string): Promise<Challenge | Error> => {
    return createJoinRequestChallenge(CHALLENGE_TAG_JOIN_REQUEST_SUPPORTED, clientId);
};

export const createJoinRequestDecodeChallenge = async (clientId: string): Promise<Challenge | Error> => {
    return createJoinRequestChallenge(CHALLENGE_TAG_JOIN_REQUEST_DECODE, clientId);
};

export const solveJoinRequestSupportedChallenge = async (result: ChallengeResultDto): Promise<boolean | Error> => {
    return solveJoinRequestChallenge(result, checkJoinRequestSupported, progressService.validateJoinRequestSupported);
};

export const solveJoinRequestDecodeChallenge = async (result: ChallengeResultDto): Promise<boolean | Error> => {
    return solveJoinRequestChallenge(result, checkJoinRequestDecode, progressService.validateJoinRequestDecode);
};

const checkJoinRequestSupported = (challenge: Challenge, result: ChallengeResultDto): boolean => {
    if (result.errors && result.errors.length > 0 || !result.content!.messages) {
        return false;
    }
    let itemCount = challenge.content!.messages.length;
    if (itemCount !== result.content!.messages.length) {
        return false;
    }
    for (let i = 0; i < itemCount; i++) {
        let challengeStr = new JoinRequestPacketDecoder(challenge.content.messages[i].topic, Buffer.from(challenge.content!.messages[i].message, 'utf8'));
        let resultSupported = result.content!.messages[i].supported;
        if (resultSupported != challengeStr.isSupported()) {
            return false;
        }
    }
    return true;
};


const checkJoinRequestDecode = (challenge: Challenge, dto: ChallengeResultDto): boolean => {
    if (dto.errors && dto.errors.length > 0 || !dto.content!.messages) {
        return false;
    }
    let itemCount = challenge.content.messages.length;
    if (itemCount !== dto.content!.messages.length) {
        return false;
    }
    for (let i = 0; i < itemCount; i++) {
        let decoder = new JoinRequestPacketDecoder(challenge.content.messages[i].topic, Buffer.from(challenge.content!.messages[i].message, 'utf8'));
        let result = dto.content!.messages[i];
        if (!decoder.isSupported() || !result.supported) {
            logger.warn("Should not happen! Decode Join Request challenge should only contain valid Join Requests");
            return false;
        }
        if (JSON.stringify(decoder.decode()) !== result.decodedPacket) {
            return false;
        }
    }
    return true;
};


export const createJoinRequestChallenge = async (tag: string, clientId: string): Promise<Challenge | Error> => {
    const team: Team | Error = await teamDao.findByClientId(clientId);
    if (team instanceof Error) {
        logger.warn(`Failed to retrieve team for client: ${clientId}`);
        return team;
    }
    const content: { messages: { topic: string, message: string }[] } = {
        messages: []
    };
    for (let i = 0; i < 20; i++) {
        content.messages.push(tag === CHALLENGE_TAG_JOIN_REQUEST_SUPPORTED ? helper.randomRequest() : helper.randomJoinRequest());
    }
    const challenge = new Challenge(tag, team, content);
    return await challengeDao.create(challenge);
};

export const solveJoinRequestChallenge = async (result: ChallengeResultDto, validator: Function, updateStep: Function): Promise<boolean | Error> => {
    const challenge: Challenge | Error = await challengeDao.findOne(result.challengeId!);
    if (challenge instanceof Error) {
        logger.warn(`Failed to retrieve challenge for id: ${result.challengeId}`);
        return challenge;
    }
    // We don't need the challenge anymore
    await challengeDao.deleteOne(challenge.id!);
    let stepValidated = validator(challenge, result);
    if (!stepValidated) {
        return false;
    }

    let team: Team | Error = await teamDao.findOne(challenge.teamId!);
    if (team instanceof Error) {
        logger.warn(`Failed to retrieve team: ${challenge.teamId}`);
        return team;
    }
    return await updateStep(team);
};