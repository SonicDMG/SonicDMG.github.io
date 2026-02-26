import { format, parseISO } from 'date-fns';

export function formatDate(date: string): string {
  try {
    return format(parseISO(date), 'MMMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return date;
  }
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Made with Bob
