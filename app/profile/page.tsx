'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import type { IPrompt } from '@/interfaces';
import { Profile } from '@/components';


export default function ProfilePage () {
  const [userPrompts, setUserPrompts] = useState<IPrompt[]>([]);
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    window.fetch(`/api/users/${data?.user.id}/prompts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(setUserPrompts)
      .catch((err) => console.error(err));

  }, [data?.user]);
  
  
  const handleEdit = (prompt: IPrompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: IPrompt) => {
    const deleteConfirmed = window.confirm('Are you sure to want to delete this prompt?');
    if (deleteConfirmed) {
      try {
        await window.fetch(`/api/prompt/${prompt._id}`, {
          method: 'DELETE'
        });
        const newPrompts = userPrompts.filter((p) => p._id !== prompt._id);
        setUserPrompts(newPrompts);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <Profile
      name="My Profile"
      desc="Welcome to your personalize profile page"
      data={userPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
