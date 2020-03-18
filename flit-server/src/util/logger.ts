import winston from "winston";

const getTransports = (nodeEnv: string) => {
    switch(nodeEnv) {
        case "production":
            return [new winston.transports.Console({level: "warn"})];
        case "test":
            return [];
        case "dev":
        case "development":
        default:
            return [
                new winston.transports.Console({level: "warn"}),
                new winston.transports.File({ filename: "debug.log", level: "debug" }),
            ];
    }
}

const options: winston.LoggerOptions = {
    transports: getTransports(process.env.NODE_ENV),
};

const logger = winston.createLogger(options);

logger.debug("Logging initialized.");

export default logger;
