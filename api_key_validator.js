const express = require('express');
const app = express();

const VALID_API_KEY = "glazyr-beta-dogfood-2026";

app.get('/validate_token', async (req, res) => {
    const apiKey = req.query.api_key;
    
    if (!apiKey) {
        console.log("No API key provided in query params.");
        return res.status(401).send("Unauthorized - Missing API Key");
    }

    if (apiKey === VALID_API_KEY) {
        console.log(`Validated API key successfully.`);
        return res.status(200).send("OK");
    } else {
        console.log(`Invalid API key provided: ${apiKey}`);
        return res.status(401).send("Unauthorized - Invalid API Key");
    }
});

app.listen(4546, '127.0.0.1', () => {
    console.log("API Key Validator running on 127.0.0.1:4546");
});
