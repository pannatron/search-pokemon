export const getTypeColor = (type: string): { from: string, to: string, text: string, bg: string } => {
  const types: { [key: string]: { from: string, to: string, text: string, bg: string } } = {
    Normal: { from: 'from-gray-400', to: 'to-gray-500', text: 'text-gray-800', bg: 'bg-gray-500' },
    Fire: { from: 'from-red-500', to: 'to-orange-500', text: 'text-red-800', bg: 'bg-red-500' },
    Water: { from: 'from-blue-500', to: 'to-blue-600', text: 'text-blue-800', bg: 'bg-blue-500' },
    Electric: { from: 'from-yellow-400', to: 'to-yellow-500', text: 'text-yellow-800', bg: 'bg-yellow-400' },
    Grass: { from: 'from-green-500', to: 'to-green-600', text: 'text-green-800', bg: 'bg-green-500' },
    Ice: { from: 'from-cyan-400', to: 'to-cyan-500', text: 'text-cyan-800', bg: 'bg-cyan-400' },
    Fighting: { from: 'from-red-600', to: 'to-red-700', text: 'text-red-800', bg: 'bg-red-600' },
    Poison: { from: 'from-purple-500', to: 'to-purple-600', text: 'text-purple-800', bg: 'bg-purple-500' },
    Ground: { from: 'from-yellow-600', to: 'to-yellow-700', text: 'text-yellow-800', bg: 'bg-yellow-600' },
    Flying: { from: 'from-indigo-400', to: 'to-indigo-500', text: 'text-indigo-800', bg: 'bg-indigo-400' },
    Psychic: { from: 'from-pink-500', to: 'to-pink-600', text: 'text-pink-800', bg: 'bg-pink-500' },
    Bug: { from: 'from-lime-500', to: 'to-lime-600', text: 'text-lime-800', bg: 'bg-lime-500' },
    Rock: { from: 'from-stone-500', to: 'to-stone-600', text: 'text-stone-800', bg: 'bg-stone-500' },
    Ghost: { from: 'from-purple-600', to: 'to-purple-700', text: 'text-purple-800', bg: 'bg-purple-600' },
    Dragon: { from: 'from-violet-500', to: 'to-violet-600', text: 'text-violet-800', bg: 'bg-violet-500' },
    Dark: { from: 'from-gray-700', to: 'to-gray-800', text: 'text-gray-800', bg: 'bg-gray-700' },
    Steel: { from: 'from-slate-400', to: 'to-slate-500', text: 'text-slate-800', bg: 'bg-slate-400' },
    Fairy: { from: 'from-pink-400', to: 'to-pink-500', text: 'text-pink-800', bg: 'bg-pink-400' }
  };

  return types[type] || types['Normal'];
};
