import { format, parseISO } from 'date-fns';

/**
 * Formats a date string into a human-readable format
 * @param date - ISO date string to format
 * @returns Formatted date string (e.g., "January 01, 2024")
 */
export function formatDate(date: string): string {
  try {
    return format(parseISO(date), 'MMMM dd, yyyy');
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error formatting date:', error);
    }
    return date;
  }
}
