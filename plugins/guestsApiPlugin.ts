import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Plugin } from 'vite';
import type { Guest } from '../src/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'guests.json');

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'wedding2026';
}

function isAuthorized(authHeader: string | undefined): boolean {
  if (!authHeader?.startsWith('Bearer ')) return false;
  return authHeader.slice(7).trim() === adminPassword();
}

function readGuests(): Guest[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Guest[]) : [];
  } catch {
    return [];
  }
}

function writeGuests(guests: Guest[]): void {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(guests, null, 2), 'utf8');
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

/** Local /api handlers so `npm run dev` works without `vercel dev`. */
export function guestsApiPlugin(): Plugin {
  return {
    name: 'guests-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (!url.startsWith('/api/')) return next();

        try {
          if (url === '/api/admin-login' && req.method === 'POST') {
            const raw = await readBody(req);
            const body = raw ? JSON.parse(raw) : {};
            if (String(body.password ?? '') !== adminPassword()) {
              return sendJson(res, 401, { error: 'Wrong password' });
            }
            return sendJson(res, 200, { token: adminPassword() });
          }

          if (url === '/api/guests') {
            if (req.method === 'GET') {
              return sendJson(res, 200, { guests: readGuests() });
            }
            if (req.method === 'PUT') {
              if (!isAuthorized(req.headers.authorization)) {
                return sendJson(res, 401, { error: 'Unauthorized' });
              }
              const raw = await readBody(req);
              const body = raw ? JSON.parse(raw) : {};
              if (!Array.isArray(body.guests)) {
                return sendJson(res, 400, { error: 'Body must be { guests: Guest[] }' });
              }
              writeGuests(body.guests as Guest[]);
              return sendJson(res, 200, { ok: true, count: body.guests.length });
            }
          }

          return sendJson(res, 404, { error: 'Not found' });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Server error';
          return sendJson(res, 500, { error: message });
        }
      });
    },
  };
}
