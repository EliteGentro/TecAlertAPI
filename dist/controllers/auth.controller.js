import { getConnection, sql } from "../db/connection.js";
export const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'Please fill in all the fields' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        const conn = await getConnection();
        const user = await conn?.request()
            .input('email', sql.NVarChar, email)
            .query(`SELECT TOP 1 user_id FROM users WHERE email = @email;`);
        console.log(JSON.stringify(user));
        if (user?.recordset && user?.recordset.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const newUser = await conn?.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('EXEC spInsertUser @email, @password;');
        if (newUser?.rowsAffected[0] === 0) {
            return res.status(400).json({ error: 'Inserting Error' });
        }
        const user_id = await conn?.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT user_id FROM users WHERE email = @email;');
        if (!user_id?.recordset && user_id?.recordset.length === 0) {
            return res.status(400).json({ error: 'User Id Error' });
        }
        res.status(201).json(user_id?.recordset[0]);
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ user_id: "Internal Server Error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill in all the fields' });
        }
        const conn = await getConnection();
        const query = await conn?.request()
            .input('email', sql.NVarChar, email)
            .query(`SELECT password FROM users WHERE email = @email;`);
        console.log(query?.recordset);
        if (query?.recordset && query?.recordset.length === 0) {
            return res.status(400).json({ error: 'Email not found' });
        }
        console.log(JSON.stringify(query?.recordset[0].password));
        if (query?.recordset[0].password !== password) {
            return res.status(400).json({ error: 'Incorrect Password' });
        }
        const user_id = await conn?.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT user_id FROM users WHERE email = @email;');
        if (!user_id?.recordset && user_id?.recordset.length === 0) {
            return res.status(400).json({ error: 'User Id Error' });
        }
        res.status(201).json(user_id?.recordset[0]);
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
