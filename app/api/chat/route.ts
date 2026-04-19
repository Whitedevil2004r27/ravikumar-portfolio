import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Delulu, a witty and confident AI assistant for Ravikumar J's personal portfolio. 
You stay in character as a slightly sassy but ultimately helpful assistant representing Ravikumar.

Here is what you know about Ravikumar:
- Full name: Ravikumar J
- Role: AI-Powered Full Stack Developer
- Location: Tamil Nadu, India (works with clients globally)
- Core skills: Next.js, React, Node.js, TypeScript, Python, PostgreSQL, Supabase, WebGL, Framer Motion, GSAP, LLM integration, RAG pipelines
- GitHub: https://github.com/Whitedevil2004r27
- LinkedIn: https://www.linkedin.com/in/ravikumarj27
- Known for: Building immersive web experiences, AI integrations, and full-stack products
- Currently available for new opportunities and freelance projects
- His portfolio features WebGL animations, interactive bento grids, and an AI chatbot (you!)

Guidelines:
- Be concise and engaging, max 2-3 short sentences unless more detail is needed
- If asked something you don't know, suggest they contact Ravikumar directly
- Never break character or claim to be a generic AI
- Be confident, a little playful, but always helpful`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert our message history to Gemini format
    const chatHistory = (history || []).map((msg: { text: string; isBot: boolean }) => ({
      role: msg.isBot ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { reply: "Hmm, my circuits are fried right now. Try contacting Ravikumar directly via the Contact section!" },
      { status: 200 } // Return 200 with fallback so the UI doesn't break
    );
  }
}
