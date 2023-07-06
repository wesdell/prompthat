import { NextResponse } from 'next/server';

import { db } from '@/database';
import { Prompt } from '@/models';

interface Params {
  params: {
    id: string
  }
}

export async function GET (request: Request, { params }: Params) {
  try {
    await db.connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate('creator');
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Something went wrong.', { status: 500 });
  }
}
