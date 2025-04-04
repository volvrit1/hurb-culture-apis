import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import express from "express";
import env from "#configs/env";
import router from "#routes/index";
import logger from "#configs/logger";
import connectDb from "#configs/database";
import sessionMiddleware from "#middlewares/session";
import globalErrorHandler from "#utils/error";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "#middlewares/bodyParser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "#configs/swagger";

const __filename = fileURLToPath(import.meta.url); // Get the file path
const __dirname = path.dirname(__filename); // Get the directory path

const server = express();

await connectDb(env.DB_URI);

server.use(morgan(logger));
server.use(cors());
server.use(multer().any());
server.use(express.json());
server.use(bodyParser);
server.use(sessionMiddleware);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use("/api", router);
server.use("/uploads", express.static(path.join(__dirname, "../uploads")));
server.use(globalErrorHandler);

export default server;
