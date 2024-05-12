import express from "express";
import bookRoute from "./bookRoutes";

const router = express.Router();

router.use("/book", bookRoute);

export default router;
