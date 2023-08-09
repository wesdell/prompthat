'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import type { IFormPromp } from '@/interfaces';
import { Form } from '@/components';

export default function CreatePromptPage () {
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<IFormPromp>({
    prompt: '',
    tag: ''
  });
  const { data } = useSession();
  const router = useRouter();

  const handlePostPrompt = (newPrompt: string) => {
    setPrompt({
      ...prompt,
      prompt: newPrompt
    });
  };

  const handlePostTag = (tag: string) => {
    setPrompt({
      ...prompt,
      tag
    });
  };
  
  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await window.fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: prompt.prompt,
          userId: data?.user.id,
          tag: prompt.tag
        })
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Form
      type="Create"
      prompt={prompt}
      submitting={submitting}
      handlePostPrompt={handlePostPrompt}
      handlePostTag={handlePostTag}
      handleSubmit={createPrompt}
    />
  );
}
