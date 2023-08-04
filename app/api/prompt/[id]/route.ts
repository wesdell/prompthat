import { NextResponse } from 'next/server';

import { db } from '@/database';
import { Prompt } from '@/models';

interface Params {
  params: {
    id: string
  }
}

export async function GET (resquest: Request, { params }: Params) {
  try {
    await db.connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return NextResponse.json('Prompt not found.', { status: 404 });
    }
    
    return NextResponse.json(prompt, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Something went wrong.', { status: 500 });
  }
}

export async function PATCH (request: Request, { params }: Params) {
  const { prompt = '', tag = '' } = await request.json();

  try {
    await db.connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    
    if (!prompt || !tag) {
      return NextResponse.json('All fields are required.', { status: 400 });
    }

    if (!existingPrompt) {
      return NextResponse.json('Prompt not found.', { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    
    await existingPrompt.save();
    return NextResponse.json(existingPrompt, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to update prompt.', { status: 500 });
  }
}

export async function DELETE (request: Request, { params }: Params) {
  try {
    await db.connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return NextResponse.json('Prompt deleted successfully.', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to delete prompt.', { status: 500 });
  }
}
