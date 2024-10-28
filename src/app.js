import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import RouterUsers from "./routes/api/users.router.js";
import RouterClients from "./routes/api/clients.router.js";
import RouterJobs from "./routes/api/jobs.router.js";
import RouterBudgets from "./routes/api/budgets.router.js";
import RouterPayments from "./routes/api/payments.router.js";
import RouterInvoices from "./routes/api/invoice.router.js";
import RouterSessions from "./routes/api/sessions.router.js";
import config from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { addLogger, logger } from "./utils/loggers.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import __mainDirname from "./utils/utils.js";

const usersRouter = new RouterUsers();
const clientsRouter = new RouterClients();
const jobsRouter = new RouterJobs();
const budgetsRouter = new RouterBudgets();
const paymentsRouter = new RouterPayments();
const invoicesRouter = new RouterInvoices();
const sessionsRouter = new RouterSessions();

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

initializePassport()
app.use(passport.initialize());

app.use(addLogger);

app.use("/api/users", usersRouter.getRouter());
app.use("/api/clients", clientsRouter.getRouter());
app.use("/api/jobs", jobsRouter.getRouter());
app.use("/api/budgets", budgetsRouter.getRouter());
app.use("/api/payments", paymentsRouter.getRouter());
app.use("/api/invoices", invoicesRouter.getRouter());
app.use("/api/sessions", sessionsRouter.getRouter());

app.use(errorMiddleware);

// Definir la configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Project Documentation',
            description: 'Documentación de la API de ejemplo',
            version: '1.0.0',
            contact: {
            name: 'Javier Ballon'
            }
        }
    },
    apis: [`${__mainDirname}/docs/**/*.yaml`] // Archivos donde están los endpoints
};
  
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));

const port = Number(config.port);
app.listen(port, () => {
    logger.info(`Server is running on ${port}`);
})