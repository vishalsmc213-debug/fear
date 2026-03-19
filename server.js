const express = require('express');
const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(express.json());

// API Keys (இதை .env ஃபைலில் வைக்க வேண்டும்)
const openai = new OpenAI({ apiKey: 'YOUR_CHATGPT_API_KEY' });
const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY');

// 1. Code Error Fixer (Using ChatGPT)
app.post('/api/fix-code', async (req, res) => {
    try {
        const { code } = req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: `Fix this code and explain errors: ${code}` }],
        });
        res.json({ fixedCode: response.choices[0].message.content });
    } catch (err) {
        res.status(500).send("ChatGPT Error: " + err.message);
    }
});

// 2. Photo & Voice Question Solver (Using Gemini Vision)
app.post('/api/ask-gemini', async (req, res) => {
    try {
        const { question } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(question);
        const response = await result.response;
        res.json({ answer: response.text() });
    } catch (err) {
        res.status(500).send("Gemini Error: " + err.message);
    }
});

// இந்த வரியைச் சேர்க்கவும் (Vercel-க்கு இதுதான் முக்கியம்)
module.exports = app;

// பழைய app.listen வரியை நீக்கிவிடலாம் அல்லது அப்படியே விடலாம்
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`FEAR AI Server is Live on Port ${PORT}`));
