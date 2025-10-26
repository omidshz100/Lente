export interface MatchResult {
  score: number;
  explanations: string[];
}

const synonymMap: Record<string, string[]> = {
  ios: ['iphone', 'ipad', 'apple', 'swift', 'swiftui', 'uikit', 'apple frameworks', 'objective-c', 'apple ecosystem', 'watchos', 'apple platforms', 'app store'],
  android: ['kotlin', 'java android', 'google play'],
  mobile: ['ios', 'android', 'react native', 'flutter', 'app', 'smartphone', 'mobile-first', 'native mobile', 'cross-platform'],
  team: ['collaboration', 'teamwork', 'cross-functional', 'agile', 'cross-team', 'distributed teams', 'team player', 'team-oriented', 'cross-departmental', 'mentoring', 'leadership', 'people management', 'team management'],
  leadership: ['management', 'lead', 'mentor', 'senior', 'architect', 'cross-departmental', 'technical leadership', 'team coordination'],
  backend: ['server', 'api', 'rest', 'database', 'node', 'backend development', 'integration'],
  frontend: ['ui', 'ux', 'react', 'web', 'interface', 'mobile-first', 'pwa'],
  milan: ['milano', 'milan area', 'lombardy', 'monza', 'bergamo', 'como', 'northern italy', 'greater milan'],
  rome: ['roma', 'central italy'],
  developer: ['engineer', 'programmer', 'development', 'specialist', 'expert'],
  experience: ['skilled', 'expert', 'proficient', 'extensive', 'background', 'track record'],
};

const locationSynonyms: Record<string, string[]> = {
  milan: ['milano', 'monza', 'bergamo', 'como', 'lombardy', 'northern italy', 'greater milan area', 'milan metropolitan'],
  rome: ['roma', 'central italy'],
  turin: ['torino'],
  florence: ['firenze', 'central italy'],
  bologna: ['emilia-romagna'],
  verona: ['northern italy', 'veneto'],
};

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function expandWithSynonyms(term: string): string[] {
  const normalized = normalizeText(term);
  const expansions = [normalized];

  for (const [key, synonyms] of Object.entries(synonymMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      expansions.push(key, ...synonyms);
    }
    if (synonyms.some(syn => normalized.includes(syn) || syn.includes(normalized))) {
      expansions.push(key, ...synonyms);
    }
  }

  return [...new Set(expansions)];
}

function matchLocation(searchTerm: string, candidateLocation: string): { matches: boolean; explanation?: string } {
  const normalizedSearch = normalizeText(searchTerm);
  const normalizedLocation = normalizeText(candidateLocation);

  if (normalizedLocation.includes(normalizedSearch) || normalizedSearch.includes(normalizedLocation)) {
    return { matches: true, explanation: `Location match: ${candidateLocation}` };
  }

  for (const [location, synonyms] of Object.entries(locationSynonyms)) {
    if (normalizedSearch.includes(location) || synonyms.some(syn => normalizedSearch.includes(syn))) {
      if (normalizedLocation.includes(location) || synonyms.some(syn => normalizedLocation.includes(syn))) {
        return { matches: true, explanation: `Location match: ${candidateLocation} (matches "${location}" area)` };
      }
    }
  }

  return { matches: false };
}

export function semanticMatch(
  query: string,
  candidateName: string,
  candidateDescription: string,
  candidateLocation: string,
  candidateSkills: string[]
): MatchResult {
  const normalizedQuery = normalizeText(query);
  const normalizedDescription = normalizeText(candidateDescription);
  const normalizedSkills = candidateSkills.map(normalizeText);

  const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);

  let totalScore = 0;
  const explanations: string[] = [];
  const maxScore = 100;

  const expandedQuery = queryWords.flatMap(expandWithSynonyms);

  let skillMatches = 0;
  let descriptionMatches = 0;
  const matchedConcepts = new Set<string>();

  for (const searchTerm of expandedQuery) {
    if (normalizedSkills.some(skill => skill.includes(searchTerm) || searchTerm.includes(skill))) {
      skillMatches++;
      matchedConcepts.add(searchTerm);
    }

    if (normalizedDescription.includes(searchTerm)) {
      descriptionMatches++;
      matchedConcepts.add(searchTerm);
    }
  }

  if (matchedConcepts.size > 0) {
    const conceptScore = Math.min(50, matchedConcepts.size * 8);
    totalScore += conceptScore;

    const primaryConcepts = Array.from(matchedConcepts).slice(0, 3);
    if (primaryConcepts.length > 0) {
      explanations.push(`Key skills detected: ${primaryConcepts.join(', ')}`);
    }
  }

  if (skillMatches > 0) {
    const skillBonus = Math.min(20, skillMatches * 5);
    totalScore += skillBonus;
  }

  const iosTerms = ['ios', 'swift', 'apple', 'swiftui', 'iphone', 'ipad'];
  const hasIosInQuery = iosTerms.some(term => normalizedQuery.includes(term));
  const hasIosInCandidate = iosTerms.some(term =>
    normalizedDescription.includes(term) || normalizedSkills.some(skill => skill.includes(term))
  );

  if (hasIosInQuery && hasIosInCandidate) {
    totalScore += 20;
    explanations.push('iOS match: detected from Apple frameworks/Swift experience');
  }

  const teamTerms = ['team', 'collaboration', 'cross-functional', 'agile', 'leadership', 'mentoring'];
  const hasTeamInQuery = teamTerms.some(term => normalizedQuery.includes(term));
  const hasTeamInCandidate = teamTerms.some(term => normalizedDescription.includes(term));

  if (hasTeamInQuery && hasTeamInCandidate) {
    totalScore += 15;
    explanations.push('Teamwork match: strong collaboration and cross-functional experience');
  }

  const locationMatch = matchLocation(normalizedQuery, candidateLocation);
  if (locationMatch.matches) {
    totalScore += 15;
    explanations.push(locationMatch.explanation!);
  }

  const finalScore = Math.min(maxScore, totalScore);

  return {
    score: finalScore,
    explanations: explanations.length > 0 ? explanations : ['Partial match based on profile keywords'],
  };
}
