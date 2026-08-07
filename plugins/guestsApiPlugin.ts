import type { IncomingMessage, ServerResponse } from 'http';
import type { Plugin } from 'vite';
import { getAdminPassword, isAuthorized } from '../api/lib/auth';
import { getGuests, setGuests } from '../api/lib/store';
import type { Guest } from '../src/types';

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
            if (String(body.password ?? '') !== getAdminPassword()) {
              return sendJson(res, 401, { error: 'Wrong password' });
            }
            return sendJson(res, 200, { token: getAdminPassword() });
          }

          if (url === '/api/guests') {
            if (req.method === 'GET') {
              const guests = await getGuests();
              return sendJson(res, 200, { guests });
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
              const result = await setGuests(body.guests as Guest[]);
              if (result.ok === false) {
                return sendJson(res, 503, { error: result.error });
              }
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
