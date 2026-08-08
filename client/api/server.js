/* eslint-disable no-undef */
import express from "express";
import axios from "axios";
import dotenv from "dotenv"
import cors from "cors"

const app = express()

dotenv.config({
    quiet: true
})

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }))

app.use(cors())

app.use(express.json())

const router = express.Router();

app.use("/api", router)

const MODEL_NAME = "gemini-2.5-flash-lite";

router.post("/refine-resume", async (req, res) => {
    try {
        const { resumeData } = req.body;

        if (!resumeData) {
            return res.status(400).json({ error: "Resume data is required" });
        }

        const prompt = `
            You are an expert professional resume writer and an expert ATS analyzer.
            Your task is to refine the content of the following resume JSON to be more professional, impactful, and concise for a senior/experienced role.
            
            INSTRUCTIONS:
            1. Identify fields that contain descriptions (e.g., 'Project Description', 'description', 'Professional Summary', 'Objective', 'Key Achievement').
            2. Rewrite these 'answer' fields to be more professional, using action verbs and quantifiable metrics where possible.
            3. Improve grammar and clarity.
            4. Do NOT change factual information like Names, Dates, Company Names, College Names, Links.
            5. Do NOT change the JSON structure, Keys, or IDs.
            6. Return ONLY the raw valid JSON string. Do not wrap in markdown code blocks.
            7. Refer the resume json input format, and make sure you return the outout by following the same json sturcture

            RESUME JSON:
            ${JSON.stringify(resumeData)}
        `;

        const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                responseMimeType: "application/json",
            },
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;
        console.log("apiUrl", apiUrl);

        const response = await axios.post(apiUrl, payload, {
            headers: { "Content-Type": "application/json" },
        });

        const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            return res.status(500).json({ error: "AI returned empty response" });
        }

        // Clean up potential markdown if model ignores instruction
        const cleanJson = aiText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const refinedData = JSON.parse(cleanJson);

        res.json({ data: refinedData });

    } catch (err) {
        console.error("AI Refine Error:", err.response?.data || err.message);
        res.status(500).json({ error: "Failed to refine resume" });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT", process.env.PORT)
})

export default app



