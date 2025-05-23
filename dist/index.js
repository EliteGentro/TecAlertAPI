import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.route.js';
import gameRoutes from './routes/game.route.js';
import aiRoutes from './routes/ai.route.js';
import webRoutes from './routes/web.route.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/web", webRoutes);
app.listen(5500, () => {
    console.log('Listening port 5500');
});
