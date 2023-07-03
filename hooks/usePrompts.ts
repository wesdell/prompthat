'use client';

import { useEffect, useState } from 'react';

import type { IPrompt } from '@/interfaces';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<IPrompt[]>([]);

  useEffect(() => {
    fetch('/api/prompt')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(setPrompts)
      .catch((err) => console.error(err));
  }, []);

  return {
    prompts
  };
};
