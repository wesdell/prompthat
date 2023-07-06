import { db } from '@/database';
import { Prompt } from '@/models';

export async function POST (req: Request) {
  const { userId, prompt = '', tag = '' } = await req.json();

  if (!prompt || !tag) {
    return new Response('Failed to create prompt. Missing fields.', { status: 400 });
  }
  
  try {
    await db.connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    });
    await newPrompt.save();

    return new Response(newPrompt, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create prompt. Review server logs.',{ status: 500 });
  }
}
