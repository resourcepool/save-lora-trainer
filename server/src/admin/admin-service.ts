import {config} from '../config';
const jwt = require('jsonwebtoken');
const teamDao = require('../team/team-dao');
const dateDao = require('../date/date-dao');
const challengeDao = require('../challenge/challenge-dao');

export const authenticate = (username: string, password: string) => {
    if (config.admin.username === username && config.admin.password === password) {
        return {token: jwt.sign({ sub: '000', username: username, isAdmin: true }, config.adminSecret)};
    }
    return;
};

export const resetGame = async () => {
    await teamDao.deleteAll();
    await challengeDao.deleteAll();
    await dateDao.deleteAll();
};
