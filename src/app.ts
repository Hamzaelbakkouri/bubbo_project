import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import utiles
import "./utils/index";
// imported routes
import router from "./routes";
// imported error middlewares
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

// import utiles
import "./utils/index";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

// handel data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use("/api/v1", router);

// use error Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
