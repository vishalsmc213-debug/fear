const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// 1. Code Fixer API
app.post('/api/fix-code', (req, res) => {
    const userCode = req.body.code;
    
    // இங்கே ஒரு உண்மையான AI (OpenAI/Gemini API) இணைக்கப்பட வேண்டும்
    // தற்போதைக்கு ஒரு Sample Response:
    if (!userCode) {
        return res.status(400).json({ error: "Code is empty!" });
    }

    const fixedCode = `// AI Fixed Version\n${userCode}\n// Error Fixed: Added missing semicolon and optimized loops.`;
    res.json({ fixedCode: fixedCode });
});

// 2. Smart Project Suggestion API
app.get('/api/projects', (req, res) => {
    const projects = [
        { id: 1, name: "Smart Dustbin", price: 10, category: "IoT" },
        { id: 2, name: "Voice Controlled Car", price: 20, category: "Robotics" },
        { id: 3, name: "AI Face Lock", price: 15, category: "AI" }
    ];
    res.json(projects);
});

// 3. Payment Verification API (Simulated)
app.post('/api/verify-payment', (req, res) => {
    const { transactionId, projectId } = req.body;
    // இங்கே உங்கள் பேங்க் ஸ்டேட்மென்ட் அல்லது UPI API உடன் செக் செய்ய வேண்டும்
    console.log(`Verifying payment for Project ${projectId}`);
    res.json({ status: "success", message: "Unlocked! You can now view the circuit diagram." });
});

app.listen(PORT, () => {
    console.log(`FEAR AI Server running on http://localhost:${PORT}`);
});
