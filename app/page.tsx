'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('usernames') || '[]');
    setUsers(storedUsers);
  }, []);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed !== '') {
      const updatedUsers = Array.from(new Set([...users, trimmed]));
      localStorage.setItem('usernames', JSON.stringify(updatedUsers));
      localStorage.setItem('username', trimmed); // aktualny użytkownik
      setUsers(updatedUsers);
      router.push('/profile');
    }
  };

  const handleLogin = (username: string) => {
    localStorage.setItem('username', username);
    router.push('/profile');
  };

  const handleDelete = (username: string) => {
    const updatedUsers = users.filter((user) => user !== username);
    localStorage.setItem('usernames', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    const current = localStorage.getItem('username');
    if (current === username) {
      localStorage.removeItem('username');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Wpisz imię lub wybierz z listy</h1>

        {/* Wybór istniejącego użytkownika */}
        {users.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg text-gray-700 mb-2">Zapisani użytkownicy:</h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li key={user} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded">
                  <span className="text-gray-800">{user}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLogin(user)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Zaloguj
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Wpisanie nowego imienia */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nowe imię"
          className="w-full px-4 py-2 border border-b-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Kontynuuj
        </button>
      </div>
    </main>
  );
}