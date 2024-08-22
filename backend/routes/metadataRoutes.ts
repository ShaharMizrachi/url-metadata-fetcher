import { Router } from "express";
import { getMetadata } from "../controllers/getMetadata";

const router = Router();

router.post("/fetch-metadata", getMetadata);

export default router;
