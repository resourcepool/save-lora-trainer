import Logger from '../log/logger';
import Team from "../team/Team";
import * as teamDao from '../team/team-dao';
import Step from "./Step";

const logger = Logger.child({ service: 'progress'});

export const validateMQTTConnect = async (team: Team): Promise<boolean|Error> => {
    let step: Step = team.progress.hackerSteps!.filter(s => s.tag === 'brokerConnect')[0];
    step.validated = true;
    step.timestamp = Date.now();
    return await teamDao.updateProgress(team);
};

export const validateMQTTSubscription = async (team: Team): Promise<boolean|Error> => {
    let step: Step = team.progress.hackerSteps!.filter(s => s.tag === 'brokerSubscribe')[0];
    step.validated = true;
    step.timestamp = Date.now();
    return await teamDao.updateProgress(team);
};