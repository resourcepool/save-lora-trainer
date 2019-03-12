import { config } from '../../config';
import { createConnection } from 'promise-mysql';

export function dbInstance() {
    return createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
    });
};
