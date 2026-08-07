/** URL-safe slug from a guest name */
export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/** Normalize phone to digits only (WhatsApp format, no +) */
export function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  // Convert leading 0 Pakistani locals → 92…
  if (digits.startsWith('0') && digits.length >= 10) {
    digits = `92${digits.slice(1)}`;
  }
  return digits;
}
