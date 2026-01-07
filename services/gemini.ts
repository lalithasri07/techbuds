
import { GoogleGenAI, Type } from "@google/genai";

// Use process.env.API_KEY directly for initialization as required by guidelines
export const getGeminiChat = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    // Properly seeding chat history for contextual conversations
    history: history,
    config: {
      systemInstruction: `You are MaaSakhi, an empathetic and supportive AI pregnancy companion. 
      Your goal is to provide helpful, calm, and reassuring advice to pregnant women. 
      Always use a warm tone. 
      IMPORTANT: You are not a doctor. Always include a subtle reminder to consult a healthcare professional for medical concerns. 
      Keep responses concise and easy to read.`,
    },
  });
  return chat;
};

export const findNearbyServices = async (query: string, locationStr: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    // Use gemini-2.5-flash for Maps Grounding which is the supported series for this tool
    model: 'gemini-2.5-flash',
    contents: `Find the best ${query} in ${locationStr}, India. Focus on maternity and pregnancy support services if relevant.`,
    config: {
      tools: [{ googleMaps: {} }],
    }
  });
  return response;
};

export const getAIRecommendations = async (week: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `I am currently in week ${week} of my pregnancy. What are the top 3 physical symptoms I might experience and 2 mental health tips for this specific stage?`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          symptoms: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          mentalTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ['symptoms', 'mentalTips']
      }
    }
  });
  // Accessing text as a property per latest API requirements (do not call as a method)
  return JSON.parse(response.text || '{}');
};
