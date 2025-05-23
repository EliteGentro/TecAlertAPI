import express from 'express';
import { profile, match } from '../controllers/ai.controller.js';
const router = express.Router();
router.post("/profile", profile);
router.post("/match", match);
export default router;
