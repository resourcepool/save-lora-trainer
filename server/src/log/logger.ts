import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json()
});

logger.add(new winston.transports.Console({
  level: 'debug',
  format: winston.format.simple()
}));

export default logger;
