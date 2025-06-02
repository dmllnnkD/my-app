'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (savedName) {
      setName(savedName);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Strona użytkownika</h1>
        <p className="text-xl text-gray-700 mb-6">Witaj, <span className="font-semibold">{name}</span>!</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Wyloguj się
        </button>
      </div>
    </main>
  );
}
