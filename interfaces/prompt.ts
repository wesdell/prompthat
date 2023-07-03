import type { ICreator } from './';

export interface IPrompt extends IFormPromp {
  _id: string
  creator: ICreator
}

export interface IFormPromp {
  prompt: string
  tag: string
}
