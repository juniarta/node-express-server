import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
      maxSize: 300,
      maxFiles: 3,
      json: true
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
      maxSize: 300,
      maxFiles: 3,
      json: true
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: './logs/exceptions.log',
      maxSize: 300,
      maxFiles: 3
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message) {
    logger.info(message);
  }
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;
