'use client';

import {
  PageCard,
  PageCardContent,
  PageCardHeader,
  PageCardTitle,
} from '@/components/ui/pagecard';
import { Divider } from '@mui/material';
import { useState } from 'react';

const injectionPattern = /'\s*OR\b\s*'[^']+'\s*=\s*'[^']+'/i;

export default function Login() {
  const [injected, setInjected] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    console.log('Username:', username, injectionPattern.test(username));
    console.log('Password:', password, injectionPattern.test(password));

    if (injectionPattern.test(username) || injectionPattern.test(password)) {
      setInjected(true);
    } else {
      alert('Incorrect username or password :(');
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PageCard>
          <PageCardHeader>
            <PageCardTitle>Login</PageCardTitle>
          </PageCardHeader>
          <Divider variant="middle" flexItem />
          <PageCardContent className="items-start">
            {injected ? (
              <p className="mb-4 text-red-500 font-bold">
                SQL Injection Detected! Here is your flag:{' '}
                {process.env.NEXT_PUBLIC_FLAG_SQLI}
              </p>
            ) : (
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={handleSubmit}
              >
                <label htmlFor="username" className="font-bold">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
                <label htmlFor="password" className="font-bold">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
            )}
          </PageCardContent>
        </PageCard>
      </main>
    </div>
  );
}
