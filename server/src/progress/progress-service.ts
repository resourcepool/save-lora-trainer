import Logger from '../log/logger';
import Team from "../team/Team";
import * as teamDao from '../team/team-dao';
import Step from "./Step";
import {
    HACKER_STEP_BROKER_CONNECT,
    HACKER_STEP_BROKER_SUBSCRIBE,
    HACKER_STEP_JOIN_REQUEST_DECODE,
    HACKER_STEP_JOIN_REQUEST_SUPPORTED
} from "./Progress";

const logger = Logger.child({ service: 'progress'});

const validateStep = async (team: Team, tag: string): Promise<boolean|Error> => {
    let step: Step = team.progress.hackerSteps!.find(s => s.tag === tag)!;
    step.validated = true;
    step.timestamp = Date.now();
    return await teamDao.updateProgress(team);
};

export const validateMQTTConnect = async (team: Team): Promise<boolean|Error> => {
    return await validateStep(team, HACKER_STEP_BROKER_CONNECT);
};

export const validateMQTTSubscription = async (team: Team): Promise<boolean|Error> => {
    return await validateStep(team, HACKER_STEP_BROKER_SUBSCRIBE);
};

export const validateJoinRequestSupported = async (team: Team): Promise<boolean|Error> => {
    return await validateStep(team, HACKER_STEP_JOIN_REQUEST_SUPPORTED);
};

export const validateJoinRequestDecode = async (team: Team): Promise<boolean|Error> => {
    return await validateStep(team, HACKER_STEP_JOIN_REQUEST_DECODE);
};