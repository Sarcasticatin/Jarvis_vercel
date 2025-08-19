export default async function handler(req, res) {
  // CORS (allow browser requests from anywhere)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = (req.query.q || '').toString().trim();
  if (!q) return res.status(400).json({ error: 'Missing q' });

  const url = 'https://www.google.com/search?hl=en&num=6&q=' + encodeURIComponent(q);
  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      }
    });
    const html = await resp.text();

    // Very lightweight parse: extract anchor + h3 pairs (title + link)
    const results = [];
    const regex = /<a href="\/url\?q=([^"&]+)[^>]*">\s*<h3[^>]*>(.*?)<\/h3>/gms;
    let m;
    while ((m = regex.exec(html)) !== null) {
      const link = decodeURIComponent(m[1]);
      const title = stripTags(m[2]);
      if (isValid(link)) results.push({ title, link });
      if (results.length >= 6) break;
    }

    return res.status(200).json({ query: q, results });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
function isValid(u) {
  try {
    const url = new URL(u);
    // filter out google internal links
    return !url.hostname.includes('google.com');
  } catch { return false; }
}
