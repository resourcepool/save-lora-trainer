import {config} from '../config';
const jwt = require('jsonwebtoken');

export const authenticate = (username: string, password: string) => {
    if (config.admin.username === username && config.admin.password === password) {
        return {token: jwt.sign({ sub: '000', username: username, isAdmin: true }, config.adminSecret)};
    }
    return;
};
