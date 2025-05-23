import { GEMINI_URL } from "../config.js";
export const profile = async (req, res) => {
    try {
        const stats = req.body;
        console.log("Profile Called: ", JSON.stringify(stats));
        const aiResponse = await fetch(`${GEMINI_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Analyze the following player's profile from a training video game designed to teach students, teachers, 
                and campus officials how to respond to adverse situations. The game consists of answering questions that give points in 4 main 
                statistics. Using the provided stats. Write a concise paragraph evaluating strengths and weaknesses in response 
                problem resolution speed (not question speed), security awareness, protocol adherence, reasoning, 
                question accuracy, and overall effectiveness. Focus on actionable insights to improve performance. Respond in Mexican 
                Spanish. Address the player directly, without greetings, tone softening, or special formatting—this is part of a stats 
                report, not a conversation. Consider a high stat in the 4 main abilities to be around 20 points. Be an 8 on an optimism
                scale from 1 to 10. Keep your reponse between 900 and 950 characters. Only use alphanumeric characters. This are the stats in spanish:(${stats})`,
                            },
                        ],
                    },
                ],
            }),
        });
        const data = (await aiResponse.json());
        console.log(data.status);
        console.log(JSON.stringify(data));
        res.status(200).json({ response: data.candidates[0].content.parts[0].text });
    }
    catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: "Failed to get AI response" });
    }
};
export const match = async (req, res) => {
    try {
        const stats = req.body;
        console.log("Match Called: ", JSON.stringify(stats));
        const aiResponse = await fetch(`${GEMINI_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Analyze the following player's most recent match results from a training video game designed to teach students, teachers, 
                and campus officials how to respond to adverse situations. The game consists of answering questions that give points in 4 main 
                statistics. Using the provided stats. Write a concise paragraph evaluating strengths and weaknesses in response 
                problem resolution speed (not question speed), security awareness, protocol adherence, reasoning, 
                question accuracy, and overall effectiveness. Focus on actionable insights to improve performance. Respond in Mexican 
                Spanish. Address the player directly, without greetings, tone softening, or special formatting—this is part of a stats 
                report, not a conversation. Consider a high stat in the 4 main abilities to be around 20 points. Be an 8 on an optimism
                scale from 1 to 10. Keep your reponse between 900 and 950 characters. Only use alphanumeric characters. Congratulate the player 
                on its previously finished match at the start of your response. This are the stats in spanish: (${stats})`,
                            },
                        ],
                    },
                ],
            }),
        });
        const data = (await aiResponse.json());
        console.log(data.status);
        console.log(JSON.stringify(data));
        res.status(200).json({ response: data.candidates[0].content.parts[0].text });
    }
    catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: "Failed to get AI response" });
    }
};
