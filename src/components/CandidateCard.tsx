import { useState } from 'react';
import { MapPin, Award, Download } from 'lucide-react';
import { Candidate } from '../lib/supabase';

interface CandidateCardProps {
  candidate: Candidate;
  matchScore: number;
  explanations: string[];
  language: 'en' | 'it';
}

export function CandidateCard({ candidate, matchScore, explanations, language }: CandidateCardProps) {
  const [showDemoMessage, setShowDemoMessage] = useState(false);

  const handleDownloadClick = () => {
    setShowDemoMessage(true);
    setTimeout(() => setShowDemoMessage(false), 4000);
  };
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-700 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    return 'text-gray-700 bg-gray-50 border-gray-200';
  };

  const matchLabel = language === 'en' ? 'Match' : 'Corrispondenza';
  const locationLabel = language === 'en' ? 'Location' : 'Posizione';
  const skillsLabel = language === 'en' ? 'Skills' : 'Competenze';
  const languagesLabel = language === 'en' ? 'Languages' : 'Lingue';
  const whyMatchLabel = language === 'en' ? 'Why this match:' : 'Perché corrisponde:';
  const downloadLabel = language === 'en' ? 'Download CV' : 'Scarica CV';
  const demoMessage = language === 'en'
    ? 'This is a demo project. CV download functionality will be implemented in the future.'
    : 'Questo è un progetto demo. La funzionalità di download CV sarà implementata in futuro.';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{candidate.location}</span>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border-2 font-semibold ${getScoreColor(matchScore)}`}>
          {matchScore}% {matchLabel}
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{candidate.description}</p>

      <div className="mb-4">
        <div className="flex items-center text-gray-700 font-medium mb-2">
          <Award size={16} className="mr-2" />
          {skillsLabel}
        </div>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 6).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 6 && (
            <span className="px-3 py-1 text-gray-500 text-sm">
              +{candidate.skills.length - 6} {language === 'en' ? 'more' : 'altro'}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-sm text-gray-600 font-medium">{languagesLabel}: </span>
        <span className="text-sm text-gray-700">{candidate.languages.join(', ')}</span>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
        <p className="text-sm font-semibold text-green-800 mb-2">{whyMatchLabel}</p>
        <ul className="space-y-1">
          {explanations.map((explanation, index) => (
            <li key={index} className="text-sm text-green-700 flex items-start">
              <span className="mr-2">•</span>
              <span>{explanation}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={handleDownloadClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          <Download size={18} />
          {downloadLabel}
        </button>

        {showDemoMessage && (
          <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-lg animate-fade-in">
            <p className="text-sm text-blue-800 text-center">{demoMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
