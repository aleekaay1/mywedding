# Wedding Invitation

Personalized digital wedding invitations for Zoya & Bilal. Each guest receives a unique link that opens a sealed envelope and reveals event details with RSVP.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/i/ahmad-family](http://localhost:3000/i/ahmad-family) (or any guest slug from `src/data/guests.ts`).

## Guest links

Invitations are served at `/i/<guest-slug>`, for example:

- `/i/ahmad-family` — Baraat (bride's side)
- `/i/tariq-malik` — Walima (groom's side)

Edit the guest list in `src/data/guests.ts`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Typecheck and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Typecheck only |
