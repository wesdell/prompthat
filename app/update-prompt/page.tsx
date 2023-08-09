'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import type { IFormPromp } from '@/interfaces';
import { Form } from '@/components';

export default function UpdatePromptPage () {
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<IFormPromp>({
    prompt: '',
    tag: ''
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const promptId = searchParams.get('id');

  useEffect(() => {
    if (promptId) {
      window.fetch(`/api/prompt/${promptId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setPrompt({
            prompt: data.prompt,
            tag: data.tag
          });
        });
    }
  }, [promptId]);
  

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
  
  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      return;
    }
    
    try {
      const response = await window.fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: prompt.prompt,
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
      type="Edit"
      prompt={prompt}
      submitting={submitting}
      handlePostPrompt={handlePostPrompt}
      handlePostTag={handlePostTag}
      handleSubmit={updatePrompt}
    />
  );
}
