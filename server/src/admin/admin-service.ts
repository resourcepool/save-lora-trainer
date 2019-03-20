import {config} from '../config';
const jwt = require('jsonwebtoken');
const teamDao = require('../team/team-dao');
const gameDao = require('../game/game-dao');
const challengeDao = require('../challenge/challenge-dao');
const appServerService = require('../appserver/appserver-service');

export const authenticate = (username: string, password: string) => {
    if (config.admin.username === username && config.admin.password === password) {
        return {token: jwt.sign({ sub: '000', username: username, isAdmin: true }, config.adminSecret, {expiresIn: '5h'})};
    }
    return;
};

export const resetGame = async () => {
    await teamDao.deleteAll();
    await challengeDao.deleteAll();
    await gameDao.deleteAll();
    await appServerService.resetApplication();
};
