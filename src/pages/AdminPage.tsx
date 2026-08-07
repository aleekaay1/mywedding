import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  Loader2,
  LogOut,
  MessageCircle,
  Plus,
  RefreshCw,
  Trash2,
  Upload,
} from 'lucide-react';
import { EventKey, Guest } from '../types';
import { parseGuestsCsv, inviteUrl, whatsappInviteUrl } from '../utils/csv';
import { normalizePhone, slugifyName } from '../utils/slug';
import {
  fetchAllGuests,
  loginAdmin,
  replaceAllGuests,
} from '../services/guestService';

const TOKEN_KEY = 'wedding_admin_token';

type EventChoice = 'baraat' | 'walima' | 'both';

function eventLabel(events: Guest['events']): string {
  const hasB = events.includes('baraat');
  const hasW = events.includes('walima');
  if (hasB && hasW) return 'Both';
  if (hasW) return 'Walima';
  return 'Baraat';
}

function eventsFromChoice(choice: EventChoice): EventKey[] {
  if (choice === 'both') return ['baraat', 'walima'];
  return [choice];
}

function uniqueSlug(name: string, existing: Guest[]): string {
  let slug = slugifyName(name) || 'guest';
  const used = new Set(existing.map((g) => g.slug.toLowerCase()));
  if (!used.has(slug)) return slug;
  let n = 2;
  while (used.has(`${slug}-${n}`)) n++;
  return `${slug}-${n}`;
}

const fieldClass =
  'mt-2 w-full border border-[#3D2430]/15 bg-white/70 px-3 py-2.5 text-sm text-[#3D2430] outline-none focus:border-[#6B3A4A]/50';

export function AdminPage() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [honorific, setHonorific] = useState('');
  const [phone, setPhone] = useState('');
  const [eventChoice, setEventChoice] = useState<EventChoice>('baraat');

  const loadGuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchAllGuests();
      setGuests(list);
    } catch {
      setError('Could not load guests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) void loadGuests();
  }, [token, loadGuests]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return guests;
    return guests.filter(
      (g) =>
        g.full_name.toLowerCase().includes(q) ||
        g.slug.toLowerCase().includes(q) ||
        (g.phone || '').includes(q),
    );
  }, [guests, query]);

  const persistGuests = async (next: Guest[], successMsg: string) => {
    if (!token) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await replaceAllGuests(next, token);
      setGuests(next);
      setMessage(successMsg);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const t = await loginAdmin(password);
      sessionStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      setPassword('');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setGuests([]);
  };

  const handleUpload = async (file: File) => {
    if (!token) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const text = await file.text();
      const parsed = parseGuestsCsv(text);
      await replaceAllGuests(parsed, token);
      setGuests(parsed);
      setMessage(`Uploaded ${parsed.length} guests. Invite links are ready.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = fullName.trim();
    if (!name) {
      setError('Name is required.');
      return;
    }

    const guest: Guest = {
      slug: uniqueSlug(name, guests),
      full_name: name,
      honorific: honorific.trim() || undefined,
      events: eventsFromChoice(eventChoice),
      phone: normalizePhone(phone.trim()) || undefined,
      viewed: false,
    };

    await persistGuests([guest, ...guests], `Added ${guest.full_name}.`);
    setFullName('');
    setHonorific('');
    setPhone('');
    setEventChoice('baraat');
  };

  const handleDeleteGuest = async (slug: string) => {
    const target = guests.find((g) => g.slug === slug);
    if (!target) return;
    const ok = window.confirm(`Delete invite for ${target.full_name}?`);
    if (!ok) return;
    const next = guests.filter((g) => g.slug !== slug);
    await persistGuests(next, `Deleted ${target.full_name}.`);
  };

  const copyLink = async (slug: string) => {
    const url = inviteUrl(slug);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 1600);
    } catch {
      window.prompt('Copy this invite link:', url);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[100dvh] bg-[radial-gradient(ellipse_at_top,#F8EFE8_0%,#EDE0D4_55%,#E4D2C4_100%)] px-5 py-16">
        <div className="mx-auto w-full max-w-md">
          <p className="text-center text-4xl text-[#3D2430]" style={{ fontFamily: '"Alex Brush", cursive' }}>
            Admin
          </p>
          <p className="mt-2 text-center text-sm text-[#6B4A55]/80">
            Manage guests and copy WhatsApp invite links
          </p>
          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-4 border-t border-[#3D2430]/10 pt-8"
          >
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#6B4A55]">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-[#3D2430]/15 bg-white/70 px-4 py-3 text-base text-[#3D2430] outline-none focus:border-[#6B3A4A]/50"
                autoComplete="current-password"
                required
              />
            </label>
            {loginError && <p className="text-sm text-[#8B2E3C]">{loginError}</p>}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-[#3D2430] px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FBF7F2] disabled:opacity-60"
            >
              {loggingIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[radial-gradient(ellipse_at_top,#F8EFE8_0%,#EDE0D4_55%,#E4D2C4_100%)] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#3D2430]/10 pb-6">
          <div>
            <p className="text-4xl text-[#3D2430]" style={{ fontFamily: '"Alex Brush", cursive' }}>
              Guest list
            </p>
            <p className="mt-1 text-sm text-[#6B4A55]/80">
              {guests.length} guests · add · delete · CSV · WhatsApp
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B4A55]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </header>

        <section className="mt-6 border border-[#3D2430]/10 bg-white/35 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B4A55]">
            Add guest manually
          </p>
          <form onSubmit={handleAddGuest} className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#6B4A55] sm:col-span-2">
              Full name *
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={fieldClass}
                placeholder="Ahmad & Family"
                required
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#6B4A55]">
              Honorific
              <input
                type="text"
                value={honorific}
                onChange={(e) => setHonorific(e.target.value)}
                className={fieldClass}
                placeholder="Mr & Mrs"
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#6B4A55]">
              Phone / WhatsApp
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClass}
                placeholder="Optional — 923001234567"
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#6B4A55] sm:col-span-2">
              Event
              <select
                value={eventChoice}
                onChange={(e) => setEventChoice(e.target.value as EventChoice)}
                className={fieldClass}
              >
                <option value="baraat">Baraat</option>
                <option value="walima">Walima</option>
                <option value="both">Both</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={busy || !fullName.trim()}
              className="inline-flex items-center justify-center gap-2 bg-[#3D2430] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBF7F2] disabled:opacity-60 sm:col-span-2"
            >
              <Plus className="h-3.5 w-3.5" />
              {busy ? 'Saving…' : 'Add guest'}
            </button>
          </form>
        </section>

        <section className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[#3D2430]/20 bg-white/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#3D2430]">
            <Upload className="h-3.5 w-3.5" />
            {busy ? 'Working…' : 'Upload CSV'}
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              disabled={busy}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(file);
                e.target.value = '';
              }}
            />
          </label>

          <a
            href="/sample-guests.csv"
            download
            className="inline-flex items-center justify-center gap-2 border border-[#3D2430]/20 bg-white/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#3D2430]"
          >
            <Download className="h-3.5 w-3.5" />
            Sample CSV
          </a>

          <button
            type="button"
            onClick={() => void loadGuests()}
            className="inline-flex items-center justify-center gap-2 border border-[#3D2430]/20 bg-white/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#3D2430]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </section>

        <p className="mt-4 text-xs leading-relaxed text-[#6B4A55]/75">
          CSV columns: <code className="text-[#3D2430]">full_name, honorific, events, phone</code>
          . Phone is optional. Upload replaces the whole list — use the form above to add one-by-one.
        </p>

        {message && <p className="mt-3 text-sm text-[#1F4B3F]">{message}</p>}
        {error && <p className="mt-3 text-sm text-[#8B2E3C]">{error}</p>}

        <div className="mt-6">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, slug, or phone…"
            className="w-full border border-[#3D2430]/15 bg-white/70 px-4 py-3 text-sm text-[#3D2430] outline-none focus:border-[#6B3A4A]/50"
          />
        </div>

        <ul className="mt-4 divide-y divide-[#3D2430]/10 border-y border-[#3D2430]/10">
          {loading ? (
            <li className="flex items-center gap-2 py-10 text-sm text-[#6B4A55]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading guests…
            </li>
          ) : filtered.length === 0 ? (
            <li className="py-10 text-sm text-[#6B4A55]">No guests yet — add one above or upload a CSV.</li>
          ) : (
            filtered.map((g) => (
              <li
                key={g.slug}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-base text-[#3D2430]">
                    {g.honorific ? `${g.honorific} ` : ''}
                    {g.full_name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6B4A55]/80">
                    {eventLabel(g.events)}
                    {g.phone ? ` · ${g.phone}` : ' · no phone'}
                    {' · '}/i/{g.slug}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void copyLink(g.slug)}
                    className="inline-flex items-center gap-1.5 border border-[#3D2430]/20 bg-white/60 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3D2430]"
                  >
                    {copiedSlug === g.slug ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedSlug === g.slug ? 'Copied' : 'Copy link'}
                  </button>
                  {g.phone ? (
                    <a
                      href={whatsappInviteUrl(g.phone, g.slug)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#1F4B3F] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF7F2]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  ) : null}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void handleDeleteGuest(g.slug)}
                    className="inline-flex items-center gap-1.5 border border-[#8B2E3C]/30 bg-white/60 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B2E3C] disabled:opacity-60"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
