# Vercel Deployment Guide for Lente

## Steps to Deploy to Vercel

### 1. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon/public key** (looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. Set Up Your Supabase Database

If you haven't already, run the migration to create the candidates table:

1. In your Supabase dashboard, go to **SQL Editor**
2. Run the migration file content from `supabase/migrations/20251026055546_create_candidates_table.sql`

### 3. Update Local Environment

1. Open `.env.local` in your project
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 4. Test Locally

Run the development server to make sure everything works:

```bash
npm run dev
```

Visit `http://localhost:5173` and verify the app loads without errors.

### 5. Deploy to Vercel

#### Option A: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. In your project directory:
   ```bash
   vercel
   ```

3. Follow the prompts to set up your project

4. Add environment variables:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. In **Environment Variables** section, add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**

### 6. Verify Deployment

1. Once deployed, visit your Vercel URL
2. Check that the app loads without errors
3. Try the search functionality to ensure Supabase connection works

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**
   - Make sure you've added the environment variables in Vercel dashboard
   - Check that the variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

2. **Build fails**
   - Check the build logs in Vercel dashboard
   - Make sure all dependencies are in `package.json`

3. **Database connection issues**
   - Verify your Supabase project is active
   - Check that the candidates table exists
   - Ensure Row Level Security policies are correctly set

4. **404 errors on refresh**
   - This is already handled by Vite, but if you encounter issues, you may need to add a `vercel.json` file

### Need Help?

If you're still having issues, check:
- Vercel deployment logs
- Browser console for JavaScript errors
- Supabase logs in your dashboard