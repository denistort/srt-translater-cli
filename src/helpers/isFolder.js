import { existsSync, lstatSync } from 'fs';

export const isFolder = (dirPath) => {
  return existsSync(dirPath) && lstatSync(dirPath).isDirectory();
}
