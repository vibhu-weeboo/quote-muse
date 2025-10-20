import { GoogleGenAI } from "@google/genai";
import { QuoteGenre } from '../types';

export const generateQuote = async (topic: string, genre: QuoteGenre): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Create a single, original quote about "${topic}". The quote must be ${genre} and in a classical and elegant style, fit for a scholar's journal. It should be concise, under 25 words. Provide only the quote itself, without quotation marks or any other text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 1.0,
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 50 },
      }
    });
    
    // Trim and remove potential surrounding quotes
    const text = response.text.trim().replace(/^"|"$/g, '');
    
    if(!text) {
        throw new Error("Received an empty response from the API.");
    }

    return text;
  } catch (error) {
    console.error("Error generating quote:", error);
    throw new Error("Failed to generate a quote. Please try again.");
  }
};