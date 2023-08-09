import Link from 'next/link';

import type { IFormPromp } from '@/interfaces';

interface Props {
  type: string
  prompt: IFormPromp
  submitting: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handlePostPrompt: (prompt: string) => void
  handlePostTag: (tag: string) => void
}

export function Form ({
  type,
  prompt,
  submitting,
  handleSubmit,
  handlePostPrompt,
  handlePostTag
}: Props) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} Post
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share prompts with the community,
        and let your imagination run wild with any
        AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Propmt
          </span>
          <textarea
            value={prompt.prompt}
            onChange={(e) => handlePostPrompt(e.target.value)}
            placeholder="Generate cat images..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {' '}
            <span className="font-normal">(#web, #react)</span>
          </span>
          <input
            value={prompt.tag}
            onChange={(e) => handlePostTag(e.target.value)}
            placeholder="#webdevelopment"
            required
            className="form_input"
          />
        </label>
        <article className="flex-end mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="text-gray-500 text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </article>
      </form>
    </section>
  );
}
