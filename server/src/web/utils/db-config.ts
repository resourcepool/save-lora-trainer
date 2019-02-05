import { config } from '../../config';
import { createConnection } from 'promise-mysql';

export function dbInstance() {
    return createConnection({
        host: config.host,
        user: config.user,
        password: config.dbPassword,
        database: config.database,
    });
};