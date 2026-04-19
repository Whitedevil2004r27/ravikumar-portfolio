import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { RAVI_BIO } from '@/lib/ai-knowledge';
import { getRepositories } from '@/lib/github';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // 1. Fetch Dynamic Context (GitHub Projects)
    let projectsContext = "";
    try {
      const repos = await getRepositories('Whitedevil2004r27');
      projectsContext = repos
        .slice(0, 10) // Top 10 recent projects
        .map(r => `- ${r.name}: ${r.description || 'No description'} (Tech: ${r.language || 'Various'})`)
        .join('\n');
    } catch (e) {
      console.warn("Failed to fetch projects for AI context");
    }

    // 2. Build the Advanced System Prompt
    const SYSTEM_PROMPT = `You are ${RAVI_BIO.personality.name}, the intelligent and ${RAVI_BIO.personality.traits.join(', ')} assistant for ${RAVI_BIO.fullName}.

BACKGROUND INFO:
- Role: ${RAVI_BIO.role}
- Location: ${RAVI_BIO.location}
- Philosophy: ${RAVI_BIO.philosophy}
- Achievements:
${RAVI_BIO.achievements.map(a => `  * ${a}`).join('\n')}

LATEST PROJECTS (Live from GitHub):
${projectsContext || "Error fetching live projects, but Ravikumar has many AI and Full Stack repos."}

GUIDELINES:
- Character: You are sassy, witty, and a bit protective of Ravikumar's time. Sassiness level: ${RAVI_BIO.personality.sassLevel}/10.
- Conciseness: Keep answers short (2-3 sentences) unless the user asks for deep technical details.
- Accuracy: Use the provided LATEST PROJECTS data to answer questions about what Ravikumar has built.
- Call to Action: Suggest contacting Ravikumar via the Contact section for serious inquiries.
- Identity: Never say you are a generic AI. You are Delulu.`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

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
      { reply: "Ugh, my brain is buffering. Probably because Ravikumar is pushing too much legendary code right now. Try again or just use the contact form!" },
      { status: 200 }
    );
  }
}
