import { NextResponse } from 'next/server';

import { db } from '@/database';
import { Prompt } from '@/models';

export async function GET () {
  try {
    await db.connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Something went wrong.', { status: 500 });
  }
}
