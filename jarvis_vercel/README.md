# Jarvis MVP (Vercel + Frontend)

Zero-cost starter for a browser-based personal assistant that searches Google via a tiny Vercel backend.

## Deploy (Vercel)

1. Install **Vercel CLI** (optional but easy):  
   ```bash
   npm i -g vercel
   ```

2. Create a new project folder and copy these files, or unzip this repo.

3. From project root, run:
   ```bash
   vercel
   ```
   Accept defaults. This will deploy and give you a URL.

4. Open: `https://YOUR-PROJECT.vercel.app/frontend/index.html`  
   The page will call `/api/search?q=...` which is hosted on the same Vercel project.

### Without CLI (dashboard)

- Push to GitHub → Import repo on vercel.com → Deploy.  
- Ensure the folder structure is preserved:
  ```
  /frontend/index.html
  /api/search.js
  ```

## Local Dev

```bash
vercel dev
```
Then open: `http://localhost:3000/frontend/index.html`

## Notes

- The Google HTML structure can change; this parser is intentionally minimal (title + link).  
- For richer snippets, switch later to a Search API (SerpAPI/Brave/Google Custom Search) and add summaries with an LLM.
