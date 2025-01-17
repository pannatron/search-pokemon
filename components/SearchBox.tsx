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
    <form onSubmit={handleSubmit} className="mb-6 w-full max-w-2xl mx-auto">
      <div className="flex gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter Pokémon name (e.g., Pikachu)"
          maxLength={20}
          aria-label="Pokémon name search"
          className="flex-1 px-4 py-3 bg-gray-800/50 text-white placeholder-gray-400 
                     border border-primary-purple/30 rounded-lg 
                     focus:outline-none focus:border-primary-purple focus:ring-2 
                     focus:ring-primary-pink/50 transition-all duration-300
                     shadow-glow-sm hover:shadow-glow"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-primary-purple to-primary-pink 
                     text-white font-semibold rounded-lg transition-all duration-300
                     hover:shadow-glow hover:-translate-y-1
                     focus:outline-none focus:ring-2 focus:ring-primary-pink/50
                     bg-[length:200%_auto] hover:bg-right-top animate-shine"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default memo(SearchBox);
