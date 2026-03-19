const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function solveFromPhoto(imagePath, question) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageData = {
        inlineData: {
            data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
            mimeType: "image/jpeg",
        },
    };

    const result = await model.generateContent([question, imageData]);
    return result.response.text();
}
