import express from 'express';
import { stats, leaderboard, match, questions} from '../controllers/game.controller.js';
const router  = express.Router();

router.post("/stats", stats);
router.get("/leaderboard", leaderboard);
router.post("/match", match)
router.get("/questions", questions)

export default router;