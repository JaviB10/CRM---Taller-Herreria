import dotenv from "dotenv";
import Joi from "joi";
import { Command } from "commander";

dotenv.config();

const program = new Command();

program.option('--persistence <persistence>', 'variable de ambiente para la persistencia', 'MONGO');
program.parse();
const persistence = program.opts().persistence;

const envSchema = Joi.object({
    PORT: Joi.number().default(3000),
    MONGO_URL: Joi.string().uri().required(),
    PRIVATE_KEY: Joi.string().required(),
    PASS_DEFAULT: Joi.string().default('default_password'),
    ENT: Joi.string().default('development'),
}).unknown().required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    persistence: persistence,
    port: envVars.PORT,
    mongoUrl: envVars.MONGO_URL,
    privateKey: envVars.PRIVATE_KEY,
    passDefault: envVars.PASS_DEFAULT,
    entorno: envVars.ENT,
};