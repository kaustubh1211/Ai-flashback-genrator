import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCDwlBtVZc3tAzesOG8sSCqd9ZCYv4UREY');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const aiRun = async (search) => {
  try {
    const prompt = `Create study flashcards on the topic: ${search}. Format each flashcard as 'Question:Answer'. 
    Use ':' only to separate the question from the answer. Do not include ':' anywhere else in the question or answer. 
    Do not write prefixes like 'Question' or 'Answer' or any numbering. Include multiple questions and answers, each on a new line.`;
    

    const result = await model.generateContent(prompt);

    if (
      result &&
      result.response &&
      result.response.candidates &&
      result.response.candidates.length > 0 &&
      result.response.candidates[0].content.parts &&
      result.response.candidates[0].content.parts.length > 0
    ) {
      return result.response.candidates[0].content.parts[0].text; 
    } else {
      throw new Error("Invalid response format from Gemini AI API");
    }
  } catch (err) {
    console.error("Error in aiRun:", err);
    throw err; 
  }
};
