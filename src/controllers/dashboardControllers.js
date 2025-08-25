import aiResponse from "../utils/cohere.js";

const handlePrompt = async (req, res) => {
  try {
    console.log("Received request:", req.body);

    if (!req.body || !req.body.prompt) {
      return res.status(400).json({ error: "Missing required key 'prompt'" });
    }

    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    const answers = await aiResponse(prompt);

    return res.status(200).json({
      prompt,
      answers,
    });
  } catch (error) {
    console.error("Error in /prompt:", error);
    res.status(500).json({ error: error.message });
  }
};

export { handlePrompt };
