import fs from 'fs/promises';

export const readFile = async (path) => {
  const res = await fs.readFile(path, { encoding: 'utf-8'});
  return res;
}