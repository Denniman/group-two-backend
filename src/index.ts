import express from "express";
import compress from "compression";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { config as configEnv } from "dotenv";
import config from "./config";
import routes from "./routes";

//express application
const app = express();

configEnv();

const server = createServer(app);

// compress request data for easy transport
app.use(compress());

app.use(cookieParser());

// parse body params and attach them to res.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all API versions are mounted here within the app
app.use("/api/v1", routes);

server.listen(config.PORT, () => {
  console.info(`local server started on port http://localhost:${config.PORT}`);
});
