"use strict";
import express from "express";
import "./config/mongoDB.js";
//import { router as moviesRouter } from "./routers/movies.js";
import { router as authRouter } from "./routers/auth.js";
import { router as healthRouter } from "./routers/health.js";
import { router as productsRouter } from "./routers/products.js";
import rateLimiterConfig from "./config/rateLimitConfig.js";
import helmet from "helmet";
const PORT = process.env.PORT ?? 3000;
const APP = express();
APP.use(express.json());

if (process.env.NODE_ENV == "production") {
  APP.use(rateLimiterConfig);
  APP.use(helmet());
}

APP.use("/api/v1/productos", productsRouter);
APP.use("/api/v1/auth", authRouter);
APP.use("/api/v1", healthRouter);

APP.listen(PORT, (err) => {
  err
    ? console.log(`Server not running: ${err}`)
    : console.log(`Server up: http://localhost:${PORT}`);
});
