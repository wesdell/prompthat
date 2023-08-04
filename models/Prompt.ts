import { type Model, Schema, model, models } from 'mongoose';

import type { IPrompt } from '@/interfaces';

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  }
});

export const Prompt: Model<IPrompt> = models.Prompt || model('Prompt', promptSchema);
