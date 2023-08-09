'use client';

import { useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';

import type { IPrompt } from '@/interfaces';

interface Props {
  prompt: IPrompt
  handleEdit?: (prompt: IPrompt) => void
  handleDelete?: (prompt: IPrompt) => void
}

export function PromptCard ({ prompt, handleEdit, handleDelete }: Props) {
  const [copied, setCopied] = useState('');
  const { data } = useSession();
  const pathname = usePathname();

  const handleCopyPrompt = () => {
    setCopied(prompt.prompt);
    setTimeout(() => setCopied(''), 3000);
  };
  
  return (
    <section className="prompt_card">
      <article className="flex justify-between items-start gap-5">
        <section className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt={prompt.creator.username}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <article className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </article>
        </section>
        <section
          className="copy_btn"
          onClick={handleCopyPrompt}
        >
          <Image
            src={copied === prompt.prompt ? '/icons/tick.svg' : '/icons/copy.svg'}
            alt="copy button"
            width={12}
            height={12}
          />
        </section>
      </article>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {prompt.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {prompt.tag}
      </p>
      {
        data?.user.id === prompt.creator._id && pathname === '/profile' && (
          <div
            className="mt-5 flex-center gap-4 border-t border-x-gray-100 pt-3"
          >
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={() => handleEdit && handleEdit(prompt)}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => handleDelete && handleDelete(prompt)}
            >
              Delete
            </p>
          </div>
        )
      }
    </section>
  );
}
