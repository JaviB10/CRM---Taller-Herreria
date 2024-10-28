import winston from "winston";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "magenta",
        error: "red",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "blue"
    }
}

export let logger;

logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({
                    all: true,
                    colors: customLevelOptions.colors
                }),
                winston.format.simple()   
            )
        })
    ]
})

export const addLogger = (req, res, next) => {
    logger.http(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
}