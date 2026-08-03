/** Parse "Friday, October 23, 2026" + "7:00 PM Onwards" into display parts. */
export function getDateParts(eventDate: string, eventTime: string) {
  const [dayPart, rest] = eventDate.split(',').map((s) => s.trim());
  const day = (dayPart || 'Friday').toUpperCase();

  // rest ≈ "October 23, 2026"
  const cleaned = (rest || eventDate).replace(',', '');
  const tokens = cleaned.split(/\s+/);
  const month = (tokens[0] || '').toUpperCase();
  const dateNum = tokens[1] || '';
  const year = tokens[2] || '';

  const time = eventTime.replace(/\s*Onwards/i, '').trim().toUpperCase();

  return {
    day,
    month,
    dateNum,
    year,
    dateLine: [month, dateNum, year].filter(Boolean).join(' · '),
    time: time.startsWith('AT ') ? time : `AT ${time}`,
  };
}
