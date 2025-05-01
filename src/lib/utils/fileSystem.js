import { mkdir } from 'fs/promises';
import { join } from 'path';

export async function ensureDirectory(path) {
  try {
    await mkdir(path, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
} 