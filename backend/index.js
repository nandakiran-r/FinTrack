const express = require("express");
const mongoose = require("mongoose");
const Together = require("together-ai");

require("dotenv").config();

const cors = require("cors");
const deRoutes = require("./routes/deRoutes.js");
const commonRouter = require("./routes/commonRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use(commonRouter);
app.use("/de", deRoutes);

const together = new Together(process.env.TOGETHER_API_KEY);

async function generateContent(prompt) {
  try {
    const completion = await together.chat.completions.create({
      model: "meta-llama/Llama-Vision-Free",

      messages: [
        {
          role: 'system',
          content: 'Respond with small worthy texts, You are a finance assistant who responds with clear and best advice to the questions, dont mention array or input format, if json is absent reply with no data available'
        },
        {
          role: 'user',
          content: prompt
        }
      ],

      max_tokens: 400,
      temperature: 0.95,
      top_p: 0.8,
      top_k: 50,
      repetition_penalty: 1.2,

      stop: [
        "<|eot_id|>",
        "<|eom_id|>",
      ],

      stream: true,
    });

    let fullResponse = '';

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || '';
      // Append to accumulated response
      fullResponse += content;
      // Stream to stdout in real-time
      // process.stdout.write(content);
    }

    return {
      success: true,
      content: fullResponse,
    };

  } catch (error) {
    console.error("Error generating content:", error);
    return {
      success: false,
      error: error.message,
      content: null
    };
  }
}

app.post('/api', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({
      error: "Please provide a question in the request body."
    });
  }

  try {
    const answer = await generateContent(question);
    res.json({ answer });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Failed to generate content",
      details: error.message
    });
  }
});


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
    authSource: "admin",
    socketTimeoutMS: 30000,
  })
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log(err));

const port = 5000;
app.listen(port, () => {
  console.log("server started");
});

