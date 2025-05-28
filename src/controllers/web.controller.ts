import { Request, Response } from "express";
import { getConnection, sql } from "../db/connection.js";
//FAQs
export const addfaq = async (req: Request, res: Response): Promise<any> => {
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ error: 'Question and answer are required' });
        }

        const conn = await getConnection();
        await conn?.request()
            .input('question', sql.NVarChar(255), question)
            .input('answer', sql.NVarChar(255), answer)
            .query(`EXEC spAddFAQ @question, @answer;`);

        res.status(200).json({ message: "FAQ added successfully" });
    } catch (error: any) {
        console.log("Error in addfaq controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getfaqs = async (req: Request, res: Response): Promise<any> => {
    try {
        const conn = await getConnection();
        const result = await conn?.request().query(`EXEC spGetFAQs;`);

        res.status(200).json(result?.recordset);
    } catch (error: any) {
        console.log("Error in getfaqs controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const editfaq = async (req: Request, res: Response): Promise<any> => {
    try {
        const { question_id, question, answer } = req.body;

        if (!question_id || !question || !answer) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const conn = await getConnection();
        await conn?.request()
            .input('question_id', sql.Int, question_id)
            .input('question', sql.NVarChar(255), question)
            .input('answer', sql.NVarChar(255), answer)
            .query(`EXEC spEditFAQ @question_id, @question, @answer;`);

        res.status(200).json({ message: "FAQ updated successfully" });
    } catch (error: any) {
        console.log("Error in editfaq controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deletefaq = async (req: Request, res: Response): Promise<any> => {
    try {
        const { question_id } = req.body;

        if (!question_id) {
            return res.status(400).json({ error: 'question_id is required' });
        }

        const conn = await getConnection();
        await conn?.request()
            .input('question_id', sql.Int, question_id)
            .query(`EXEC spDeleteFAQ @question_id;`);

        res.status(200).json({ message: "FAQ deleted successfully" });
    } catch (error: any) {
        console.log("Error in deletefaq controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


//Contents
export const addcontent = async (req: Request, res: Response): Promise<any> => {
    try {
        const { type, url } = req.body;

        if (!type || !url) {
            return res.status(400).json({ error: 'type and url are required' });
        }

        const conn = await getConnection();
        await conn?.request()
            .input('type', sql.VarChar(255), type)
            .input('url', sql.NText, url)
            .query(`EXEC spAddContent @type, @url;`);

        res.status(200).json({ message: "Content added successfully" });
    } catch (error: any) {
        console.log("Error in addcontent controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getcontents = async (req: Request, res: Response): Promise<any> => {
    try {
        const conn = await getConnection();
        const result = await conn?.request().query(`EXEC spGetContents;`);

        res.status(200).json(result?.recordset);
    } catch (error: any) {
        console.log("Error in getcontents controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getcontentstype = async (req: Request, res: Response): Promise<any> => {
    try {
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ error: 'type is required' });
        }

        const conn = await getConnection();
        const result = await conn?.request()
            .input('type', sql.VarChar(255), type)
            .query(`EXEC spGetContentsByType @type;`);

        res.status(200).json(result?.recordset);
    } catch (error: any) {
        console.log("Error in getcontentstype controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const editcontents = async (req: Request, res: Response): Promise<any> => {
    try {
        const { content_id, type, url } = req.body;

        if (!content_id || !type || !url) {
            return res.status(400).json({ error: 'content_id, type, and url are required' });
        }

        const conn = await getConnection();
        await conn?.request()
            .input('content_id', sql.Int, content_id)
            .input('type', sql.VarChar(255), type)
            .input('url', sql.VarChar(255), url)
            .query(`EXEC spEditContents @content_id, @type, @url;`);

        res.status(200).json({ message: "Content updated successfully" });
    } catch (error: any) {
        console.log("Error in editcontents controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deletecontents = async (req: Request, res: Response): Promise<any> => {
    try {
        const { content_id } = req.body;

        if (!content_id) {
            return res.status(400).json({ error: 'content_id is required' });
        }

        const conn = await getConnection();
        await conn?.request()
            .input('content_id', sql.Int, content_id)
            .query(`EXEC spDeleteContents @content_id;`);

        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error: any) {
        console.log("Error in deletecontents controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//Roles

export const editroleid = async (req: Request, res: Response): Promise<any> => {
    try {
        const { role_id, user_id, role } = req.body;

        if (!role_id || !user_id || !role) {
            return res.status(400).json({ error: 'role_id, user_id, and role are required' });
        }

        if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({ error: 'role must be "admin" or "user"' });
        }

        const conn = await getConnection();
        await conn?.request()
            .input('role_id', sql.Int, role_id)
            .input('user_id', sql.Int, user_id)
            .input('role', sql.NVarChar(10), role)
            .query(`EXEC spEditRoleId @role_id, @user_id, @role;`);

        res.status(200).json({ message: "Role updated successfully" });
    } catch (error: any) {
        console.log("Error in editroleid controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const checkroleid = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: 'user_id is required' });
        }

        const conn = await getConnection();
        const result = await conn?.request()
            .input('user_id', sql.Int, user_id)
            .query(`EXEC spCheckRoleId @user_id;`);

        if (!result?.recordset || result.recordset.length === 0) {
            return res.status(404).json({ error: "Role not found for user_id" });
        }

        res.status(200).json(result.recordset[0]);
    } catch (error: any) {
        console.log("Error in checkroleid controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
