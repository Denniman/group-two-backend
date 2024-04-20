import express from "express";
import cors from "cors";
import compress from "compression";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

import config from "./config";
import routes from "./routes";
import ErrorService from "./services/error.service";

//express application
const app = express();

const server = createServer(app);

// allow cross origin requests
app.use(cors({ credentials: true }));

app.use(cookieParser());

// compress request data for easy transport
app.use(compress());
app.use(methodOverride());

// parse body params and attach them to res.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all API versions are mounted here within the app
app.use("/api/v1", routes);

// if error is not an instanceOf APIError, convert it.
app.use(ErrorService.converter);

// catch 404 and forward to error handler
app.use(ErrorService.notFound);

// error handler, send stacktrace only during development
app.use(ErrorService.handler);

server.listen(config.PORT, () => {
  console.info(`local server started on port http://localhost:${config.PORT}`);
});
