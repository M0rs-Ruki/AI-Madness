import { CohereClient } from "cohere-ai";

const client = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const aiResponse = async (userPrompt) => {
  try {
    const modifiedPrompt = `${userPrompt}. Please give me 3 different answers, numbered as "1.", "2.", and "3."`;

    const response = await client.chat({
      model: "command-r-plus",
      message: modifiedPrompt,   // ✅ use "message" not "messages"
      temperature: 0.9,
    });

    const text = response?.text || "";

    // Split answers based on numbering "1.", "2.", "3."
    const answers = text
      .split(/\d+\.\s/) // splits on "1. ", "2. ", "3. "
      .filter(Boolean) // remove empty parts
      .map((a) => a.trim());

    return answers;

  } catch (error) {
    console.error("Error in aiResponse:", error);
    throw error;
  }
};

export default aiResponse;
