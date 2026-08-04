# Wedding Invitation

Personalized digital wedding invitations for Ali Shah & Ammara Saleem. Each guest receives a unique link that opens a sealed envelope and reveals event details with RSVP.

- **Baraat** — Friday, October 23, 2026 · 7:00 PM · Paramount Marquee, Islamabad
- **Walima** — Saturday, October 24, 2026 · 7:00 PM · Reet Marquee, Khanna Pull, Islamabad

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/i/ahmad-family](http://localhost:3000/i/ahmad-family) (or any guest slug from `src/data/guests.ts`).

## Guest links

Invitations are served at `/i/<guest-slug>`, for example:

- `https://hamarishaadi.vercel.app/i/ahmad-family` — Baraat (girl's side)
- `https://hamarishaadi.vercel.app/i/tariq-malik` — Walima (boy's side)

### How to create invites

1. Open `src/data/guests.ts`
2. Add a guest object:
   - `slug` — URL-safe id, e.g. `sara-khan`
   - `full_name` / `honorific` — how they appear on the card
   - `events` — `['baraat']`, `['walima']`, or `['baraat', 'walima']` for both
3. Push to GitHub → Vercel redeploys
4. Share this link on WhatsApp:  
   `https://hamarishaadi.vercel.app/i/sara-khan`

Examples:

- Baraat only: `events: ['baraat']` → `/i/ahmad-family`
- Walima only: `events: ['walima']` → `/i/tariq-malik`
- Both: `events: ['baraat', 'walima']` → `/i/raza-family`

### WhatsApp thumbnail preview

Link previews use Open Graph tags + `public/og.png`.

- Preview image: replace `public/og.png` (ideally ~1200×630 or tall invitation art)
- After changing `og.png` or meta text, WhatsApp may cache the old preview — test the link in a new chat, or use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) → “Scrape Again”

Edit the guest list in `src/data/guests.ts`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Typecheck and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Typecheck only |
