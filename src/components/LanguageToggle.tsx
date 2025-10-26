import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'en' | 'it';
  onChange: (lang: 'en' | 'it') => void;
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
      <Globe size={18} className="text-gray-600 ml-2" />
      <button
        onClick={() => onChange('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-green-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onChange('it')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'it'
            ? 'bg-green-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        IT
      </button>
    </div>
  );
}
