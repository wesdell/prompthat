'use client';

import { ChangeEvent, useState } from 'react';

import { usePrompts } from '@/hooks';
import { PromptCard } from './';

export function Feed () {
  const [searchText, setSearchText] = useState('');
  const { prompts } = usePrompts();

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  
  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
      >
        <input
          type="text"
          disabled
          placeholder="Cats playing poker at the pool table..."
          value={searchText}
          onChange={handleSearchTextChange}
          className="search_input peer"
        />
      </form>
      <article className="mt-16 prompt_layout">
        {
          prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
            />
          ))
        }
      </article>
    </section>
  );
}
