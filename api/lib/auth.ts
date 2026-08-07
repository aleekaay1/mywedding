export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'wedding2026';
}

export function isAuthorized(authHeader: string | undefined | null): boolean {
  if (!authHeader?.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7).trim();
  return Boolean(token) && token === getAdminPassword();
}
