import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMotivationalQuote = async (context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a hardcore productivity coach. The user is in "Emergency Mode". They are tired, stressed, or losing focus on their double goal: Passing 7 Exams and Launching a YouTube channel in 30 days. 
      
      Give me a short, intense, punchy, and aggressive motivational quote tailored to ${context}. 
      Focus on financial freedom, discipline, and the pain of regret. 
      Max 2 sentences. No emojis.`,
    });
    
    return response.text || "Discipline is doing what you hate to do, but doing it like you love it.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The pain of discipline is far less than the pain of regret. Keep going.";
  }
};
