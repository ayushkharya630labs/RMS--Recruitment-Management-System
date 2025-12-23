import express from "express";
import { parseJobDescription } from "../controllers/jdParserController";

const router = express.Router();

router.post("/parse", parseJobDescription);

export default router;
