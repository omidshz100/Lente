import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder: string;
}

export function SearchBar({ value, onChange, onSearch, placeholder }: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
        />
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}
