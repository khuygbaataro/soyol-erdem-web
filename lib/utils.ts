import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MN_TZ = 'Asia/Ulaanbaatar';

/** Format a date in Mongolian time (UTC+8). */
export function formatMNDate(
  date: Date | string,
  opts: Intl.DateTimeFormatOptions = {},
): string {
  return new Date(date).toLocaleString('mn-MN', { timeZone: MN_TZ, ...opts });
}
