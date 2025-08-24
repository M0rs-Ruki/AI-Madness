import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config({ path: "./.env" });

const client = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const aiResponse = async (userPrompt) => {
  try {
    log("aiResponse");

    if (!userPrompt) {
      throw new Error("Prompt is required");
    }

    const response = await client.chat({
      model: "command-r-plus",
      message: userPrompt,
    });

    const generation = response?.text;
    if (!generation) throw new Error("No AI response received");

    console.log(generation);
    return generation;

  } catch (error) {
    console.error("Error in aiResponse:", error);
    throw error;
  }
};

export default aiResponse;
