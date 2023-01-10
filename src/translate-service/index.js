import { translate } from '@vitalets/google-translate-api';
import createHttpProxyAgent from 'http-proxy-agent';
import fs from 'fs/promises';
import path from 'path';

export const translateService = async (str, lang) => {
  const filePath = path
    .join(path.dirname(import.meta.url), '../', 'ips/index.json')
    .split('file:\\')[1];

  const data = await fs.readFile(filePath, { encoding: 'utf-8' });
  const ips = JSON.parse(data);
  const randomIp = ips[Math.floor(Math.random() * (ips.length - 1))].ipAdress;
  const agent = createHttpProxyAgent(randomIp);
  try {
    const { text } = await translate(str, {
      to: lang,
      // fetchOptions: { agent },
    });

    if (text) {
      return text;
    }
  } catch (e) {
    console.log(e);
    if (e.name === 'TooManyRequestsError') {
      // translateService(str, lang);
    }
  }
};
