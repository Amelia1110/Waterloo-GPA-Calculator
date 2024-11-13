// app/page.js
"use client";

import { useEffect, useState } from 'react';

type Pet = {
    name: string;
    owner: string;
  };

export default function HomePage() {
  const [pets, setPets] = useState<Pet[]>([]);;
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Updated pets state:", pets);
  }, [pets]);

  const fetchPets = async () => {
    try {
      const response = await fetch(`/api/add-pets?petName=${petName}&ownerName=${ownerName}`);
      const data = await response.json();
      console.log("API response data:", data); // Log to see the structure
      if (response.ok) {
        setPets(data.pets.rows);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Failed to fetch pets.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    await fetchPets();
  };

  return (
    <div>
      <h1>Pet Registry</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Pet Name:
          <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} />
        </label>
        <label>
          Owner Name:
          <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        </label>
        <button type="submit">Register Pet</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Registered Pets</h2>
      <ul>
        {pets.map((pet, index) => (
          <li key={index}>{`${pet.name} (Owner: ${pet.owner})`}</li>
        ))}
      </ul>
    </div>
  );
}
