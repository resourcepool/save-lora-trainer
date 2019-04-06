import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json()
});

logger.add(new winston.transports.Console({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.simple()
}));

export default logger;
