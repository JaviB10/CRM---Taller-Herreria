import config from "../config/config.js";
import { logger } from "../utils/loggers.js";

let USERSDAO;
let CLIENTSDAO;
let JOBSDAO;
let BUDGETSDAO;
let PAYMENTSDAO;

const persistence = config.persistence;

switch (persistence) {
    case "MONGO":
        const mongoose = await import("mongoose");
        logger.debug("Attempting to connect to MongoDB...");
        try {
            await mongoose.connect(config.mongoUrl);
            logger.info("MongoDB connection successful");
        } catch (error) {
            logger.fatal("Error connecting to MongoDB", error);
            process.exit(1); // Sale de la aplicación ya que es crítico
        }
        const { default: MongoUsersDao } = await import("./mongo/users.mongo.js")
        const { default: MongoClientsDao } = await import("./mongo/clients.mongo.js")
        const { default: MongoJobsDao } = await import("./mongo/jobs.mongo.js")
        const { default: MongoBudgetsDao } = await import("./mongo/budgets.mongo.js")
        const { default: MongoPaymentsDao } = await import("./mongo/payments.mongo.js")
        USERSDAO = new MongoUsersDao();
        CLIENTSDAO = new MongoClientsDao();
        JOBSDAO = new MongoJobsDao();
        BUDGETSDAO = new MongoBudgetsDao();
        PAYMENTSDAO = new MongoPaymentsDao();
        break;
}

export {
    USERSDAO,
    CLIENTSDAO,
    JOBSDAO,
    BUDGETSDAO,
    PAYMENTSDAO
}