const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI API
const openai = new OpenAIApi(new Configuration({
    apiKey: 'sk-efgh5678abcd1234efgh5678abcd1234efgh5678'  // Replace with your OpenAI API key
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Chatbot API route
app.post('/api/chatbot', async (req, res) => {
    const userMessage = req.body.message;
    
    try {
        // Generate a response using OpenAI
        const response = await openai.createCompletion({
            model: "text-davinci-003",  // You can choose a different model like "gpt-4"
            prompt: userMessage,
            max_tokens: 150
        });

        // Send the AI response back to the frontend
        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Serve the frontend (index.html)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
