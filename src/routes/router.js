import { Router as expressRouter } from "express";
import passport from "passport";
import { passportStrategyEnum } from "../config/enums.js";
import { logger } from "../utils/loggers.js";

export default class Router {
    constructor() {
        this.router = expressRouter();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {};

    get(path, policies, passportStrategy, ...callbacks) {
        this.router.get(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    post(path, policies, passportStrategy, ...callbacks) {
        this.router.post(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    put(path, policies, passportStrategy, ...callbacks) {
        this.router.put(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    delete(path, policies, passportStrategy, ...callbacks) {
        this.router.delete(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
        )
    }

    applyCustomPassportCall = (strategy) => (req, res, next) => {
        if (strategy === passportStrategyEnum.NOTHING) {
            // No autenticación necesaria, continuar al siguiente middleware
            return next();
        }
        // Verificación de JWT
        if (strategy === passportStrategyEnum.JWT) {
            const token = req.cookies['CookieToken']; // O el método que estés utilizando para obtener el token

            if (!token) {
                // Si no hay token, responde con un error 401
                logger.warning(`Unauthorized access attempt to ${req.url}: No token provided`);
                return res.status(401).json({ error: 'No token provided' });
            }
        }
        if (strategy === passportStrategyEnum.JWT || strategy === passportStrategyEnum.GITHUB) {
            
            passport.authenticate(strategy, function (err, user, info) {
                if (err) {
                    logger.error(`Authentication error: ${err.message}`);
                    return next(err);
                }
                if (!user) {
                    logger.warning(`Unauthorized access attempt to ${req.url}`);
                    return res.status(401).json({ error: message || 'Unauthorized' });
                } 
                req.user = user;
                logger.info(`User ${user.email} authenticated successfully on ${req.url}`);
                next();
            }) (req, res, next)
        } else {
            next();
        }
    }

    handlePolicies = (policies) => (req, res, next) => {
        if (policies[0] === "PUBLIC") return next();
        const user = req.user;
        if (!user) {
            logger.warning(`Unauthorized request to ${req.url} with no user`);
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }
        if (!policies.includes(user.role.toUpperCase())) {
            logger.warning(`Forbidden access by ${user.email} to ${req.url}`);
            return res.status(403).json({ message: "Forbidden" });
        }
        logger.info(`User ${user.email} passed policy check for ${req.url}`);
        req.user = user;
        next();
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            logger.info(`Success response sent for ${req.url}`);
            res.status(200).json({ data });
        };
        
        res.sendCreated = (data) => {
            logger.info(`Resource created successfully at ${req.url}`);
            res.status(201).json({ data });
        };
    
        res.sendNotFound = (message) => {
            logger.warning(`Resource not found at ${req.url}: ${message}`);
            res.status(404).json({ error: message || 'Resource not found' });
        };
    
        res.sendConflict = (message) => {
            logger.warning(`Conflict at ${req.url}: ${message}`);
            res.status(409).json({ error: message || 'Conflict' });
        };
    
        res.sendUnauthorized = (message) => {
            logger.warning(`Unauthorized access at ${req.url}: ${message}`);
            res.status(401).json({ error: message || 'Unauthorized' });
        };
    
        res.sendValidationError = (errors) => {
            logger.warning(`Validation error at ${req.url}: ${JSON.stringify(errors)}`);
            res.status(422).json({ errors });
        };
    
        res.sendServerError = (error) => {
            logger.error(`Server error at ${req.url}: ${error.message}`);
            res.status(500).json({ error: error.message });
        };
    
        res.sendClientError = (error) => {
            logger.warning(`Client error at ${req.url}: ${error}`);
            res.status(400).json({ error });
        };
    
        next();
    };

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                logger.error(`Error executing callback on ${params[0].url}: ${error.message}`);
                params[1].status(500).json({ error: error.message });
            }
        })
    }
}