import { NextResponse } from 'next/server';

import { db } from '@/database';
import { Prompt } from '@/models';

export async function POST (req: Request) {
  const { userId, prompt = '', tag = '' } = await req.json();

  if (!prompt || !tag) {
    return NextResponse.json('Bad request.', { status: 400 });
  }
  
  try {
    await db.connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    });
    await newPrompt.save();

    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Something went wrong.', { status: 500 });
  }
}
