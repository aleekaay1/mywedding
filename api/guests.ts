import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthorized } from './lib/auth';
import { getGuests, setGuests } from './lib/store';
import type { Guest } from '../src/types';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      const guests = await getGuests();
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ guests });
    }

    if (req.method === 'PUT') {
      if (!isAuthorized(req.headers.authorization)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const guests = body?.guests;
      if (!Array.isArray(guests)) {
        return res.status(400).json({ error: 'Body must be { guests: Guest[] }' });
      }
      const result = await setGuests(guests as Guest[]);
      if (!result.ok) {
        return res.status(503).json({ error: result.error });
      }
      return res.status(200).json({ ok: true, count: guests.length });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    return res.status(500).json({ error: message });
  }
}
