import type { IPrompt } from '@/interfaces';
import { PromptCard } from './';

interface Props {
  name: string
  desc: string
  data: IPrompt[]
  handleEdit: (prompt: IPrompt) => void
  handleDelete: (prompt: IPrompt) => void
}

export function Profile ({ name, desc, data, handleDelete, handleEdit }: Props) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name}
        </span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>
      <article className="mt-10 prompt_layout">
        {
          data.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        }
      </article>
    </section>
  );
}
