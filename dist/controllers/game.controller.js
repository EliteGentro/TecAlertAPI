import { getConnection, sql } from "../db/connection.js";
export const stats = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ error: 'user_id is blank' });
        }
        if (user_id < 0) {
            return res.status(400).json({ error: 'user_id should be a positive number' });
        }
        const conn = await getConnection();
        const playerStats = await conn?.request()
            .input('user_id', sql.Int, user_id)
            .query(`
            EXEC spShowStats @user_id;
            `);
        console.log(JSON.stringify(playerStats));
        if (!playerStats?.recordset && playerStats?.recordset.length === 0) {
            return res.status(400).json({ error: 'Error, player not found' });
        }
        res.status(200).json(playerStats?.recordset[0]);
    }
    catch (error) {
        console.log("Error in stats controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const leaderboard = async (req, res) => {
    try {
        const conn = await getConnection();
        const playerStats = await conn?.request()
            .input('num', sql.Int, 5)
            .query(`
            EXEC spTopPlayers @num;
            `);
        console.log(JSON.stringify(playerStats?.recordset));
        res.status(200).json(playerStats?.recordset);
    }
    catch (error) {
        console.log("Error in leaderboard controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const match = async (req, res) => {
    const { user_id, score_rapidez, score_seguridad, score_protocolo, score_razonamiento, questions_answered, time_left_seconds } = req.body;
    console.log({ user_id, score_rapidez, score_seguridad, score_protocolo,
        score_razonamiento, questions_answered, time_left_seconds });
    if ([user_id, score_rapidez, score_seguridad, score_protocolo,
        score_razonamiento, questions_answered, time_left_seconds]
        .some(value => value === null || value === undefined)) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }
    if (user_id < 0) {
        return res.status(400).json({ error: 'user_id should be a positive number' });
    }
    const conn = await getConnection();
    const insertMatch = await conn?.request()
        .input('user_id', sql.Int, user_id)
        .input('score_rapidez', sql.Int, score_rapidez)
        .input('score_seguridad', sql.Int, score_seguridad)
        .input('score_protocolo', sql.Int, score_protocolo)
        .input('score_razonamiento', sql.Int, score_razonamiento)
        .input('questions_answered', sql.Int, questions_answered)
        .input('time_left_seconds', sql.Int, time_left_seconds)
        .query(`
        EXEC spInsertMatch @user_id, @score_rapidez, @score_seguridad, @score_protocolo, @score_razonamiento, @questions_answered, @time_left_seconds;
    `);
    if (insertMatch?.rowsAffected[0] === 0) {
        return res.status(400).json({ error: 'Inserting Error' });
    }
    res.status(201).json({ message: "Success" });
};
export const questions = async (req, res) => {
    const questionsNum = 5;
    const questionsCount = 10;
    let numberArray = [];
    let questionArray = [];
    while (numberArray.length < questionsNum) {
        let num = Math.floor(Math.random() * questionsCount) + 1;
        if (!numberArray.includes(num)) {
            numberArray.push(num);
        }
    }
    while (numberArray.length > 0) {
        let questionId = numberArray.pop();
        const conn = await getConnection();
        const result = await conn?.request()
            .input('question_id', sql.Int, questionId)
            .query(`EXEC spGetQuestion @question_id`);
        const records = result?.recordset;
        if (records && records.length > 0) {
            const question_text = records[0].question_text; // All rows share this
            const answers = records.map(r => ({
                answer_text: r.ANSWER_TEXT,
                points_rapidez: r.POINTS_RAPIDEZ,
                points_seguridad: r.POINTS_SEGURIDAD,
                points_razonamiento: r.POINTS_RAZONAMIENTO,
                points_protocolo: r.POINTS_PROTOCOLO
            }));
            questionArray.push({ question_text, answers });
        }
    }
    res.status(200).json({ questionArray: questionArray });
};
