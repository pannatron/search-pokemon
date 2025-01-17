'use client';

import { useState, useCallback, memo } from 'react';

interface SearchBoxProps {
  onSearch: (value: string) => void;
  initialValue: string;
}

const SearchBox = ({ onSearch, initialValue }: SearchBoxProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const sanitizePokemonName = useCallback((name: string) => {
    return name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedName = sanitizePokemonName(searchTerm);
    if (sanitizedName) {
      onSearch(sanitizedName);
    }
  }, [searchTerm, onSearch, sanitizePokemonName]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only letters, numbers, hyphens, and spaces in input
    if (/^[a-zA-Z0-9- ]*$/.test(value) || value === '') {
      setSearchTerm(value);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter Pokémon name (e.g., Pikachu)"
          maxLength={20}
          aria-label="Pokémon name search"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default memo(SearchBox);
