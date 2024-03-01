import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiUrl = import.meta.env.DEV
  ? 'http://localhost:3001'
  : 'https://kommo-automations.apps.berlintech.ai';
