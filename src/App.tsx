import { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';
import { supabase, Candidate } from './lib/supabase';
import { semanticMatch } from './lib/semanticMatcher';
import { SearchBar } from './components/SearchBar';
import { CandidateCard } from './components/CandidateCard';
import { LanguageToggle } from './components/LanguageToggle';

interface CandidateMatch extends Candidate {
  matchScore: number;
  explanations: string[];
}

function App() {
  const [language, setLanguage] = useState<'en' | 'it'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [results, setResults] = useState<CandidateMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error loading candidates:', error);
      return;
    }

    setCandidates(data || []);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    const matchedCandidates: CandidateMatch[] = candidates
      .map((candidate) => {
        const matchResult = semanticMatch(
          searchQuery,
          candidate.name,
          candidate.description,
          candidate.location,
          candidate.skills
        );

        return {
          ...candidate,
          matchScore: matchResult.score,
          explanations: matchResult.explanations,
        };
      })
      .filter((candidate) => candidate.matchScore > 30)
      .sort((a, b) => b.matchScore - a.matchScore);

    setTimeout(() => {
      setResults(matchedCandidates);
      setIsLoading(false);
    }, 300);
  };

  const translations = {
    en: {
      title: 'Lente',
      subtitle: 'Semantic Candidate Search',
      company: 'Crédit Agricole Italy',
      poweredBy: 'Powered by',
      placeholder: 'e.g., iOS developer near Milan with teamwork experience',
      resultsFor: 'Results for',
      candidates: 'candidates',
      noResults: 'No candidates found matching your search criteria.',
      tryDifferent: 'Try different keywords or broaden your search.',
      exampleSearches: 'Example searches:',
      example1: 'iOS developer near Milan with teamwork experience',
      example2: 'Mobile engineer with agile experience in Rome',
      example3: 'Swift developer with cross-functional skills',
    },
    it: {
      title: 'Lente',
      subtitle: 'Ricerca Semantica Candidati',
      company: 'Crédit Agricole Italia',
      poweredBy: 'Sviluppato per',
      placeholder: 'es. sviluppatore iOS vicino Milano con esperienza di team',
      resultsFor: 'Risultati per',
      candidates: 'candidati',
      noResults: 'Nessun candidato trovato corrispondente ai criteri di ricerca.',
      tryDifferent: 'Prova parole chiave diverse o amplia la ricerca.',
      exampleSearches: 'Esempi di ricerca:',
      example1: 'sviluppatore iOS vicino Milano con esperienza di team',
      example2: 'ingegnere mobile con esperienza agile a Roma',
      example3: 'sviluppatore Swift con competenze cross-funzionali',
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-2xl shadow-lg">
                <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                <Search size={36} className="text-white relative z-10" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-1">{t.title}</h1>
                <p className="text-gray-600 text-sm">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{t.poweredBy}</p>
                <p className="text-lg font-bold text-green-700">{t.company}</p>
              </div>
              <LanguageToggle language={language} onChange={setLanguage} />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder={t.placeholder}
          />
        </div>

        {!hasSearched && (
          <div className="max-w-3xl mx-auto text-center py-12">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              {language === 'en' ? 'Start Your Search' : 'Inizia la Tua Ricerca'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'en'
                ? 'Use natural language to find candidates. Our semantic search understands context and synonyms.'
                : 'Usa il linguaggio naturale per trovare candidati. La nostra ricerca semantica comprende contesto e sinonimi.'}
            </p>
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-left">
              <p className="font-semibold text-gray-800 mb-3">{t.exampleSearches}</p>
              <ul className="space-y-2">
                <li className="text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>{t.example1}</span>
                </li>
                <li className="text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>{t.example2}</span>
                </li>
                <li className="text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>{t.example3}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"></div>
            <p className="text-gray-600 mt-4">
              {language === 'en' ? 'Searching candidates...' : 'Ricerca candidati...'}
            </p>
          </div>
        )}

        {!isLoading && hasSearched && (
          <div className="max-w-5xl mx-auto">
            {results.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {t.resultsFor} "<span className="text-green-700">{searchQuery}</span>"
                  </h2>
                  <p className="text-gray-600">
                    {results.length} {t.candidates}
                  </p>
                </div>
                <div className="grid gap-6">
                  {results.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      matchScore={candidate.matchScore}
                      explanations={candidate.explanations}
                      language={language}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{t.noResults}</h3>
                <p className="text-gray-600">{t.tryDifferent}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
