/*
  # Create candidates table for Lente semantic search

  1. New Tables
    - `candidates`
      - `id` (uuid, primary key) - Unique identifier for each candidate
      - `name` (text) - Full name of the candidate
      - `description` (text) - Detailed profile description for semantic matching
      - `location` (text) - Geographic location (city/area)
      - `skills` (text array) - List of key skills and technologies
      - `languages` (text array) - Spoken languages
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `candidates` table
    - Add policy for public read access (demo purposes)
    
  3. Important Notes
    - This is a demo/search system where candidate data should be publicly searchable
    - In production, you'd add authentication and restrict access appropriately
*/

CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  skills text[] DEFAULT '{}',
  languages text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read candidates"
  ON candidates
  FOR SELECT
  TO anon, authenticated
  USING (true);
