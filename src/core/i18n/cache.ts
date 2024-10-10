import { promises as fs } from 'fs'
import * as path from 'path'
import CryptoJS from 'crypto-js'

const cacheFolder = path.join(process.cwd(), 'src/core/i18n/cache');

const $cache = {

  async write(lang, keyData = {}, data = {}) {
    const hash = CryptoJS.MD5( JSON.stringify(keyData) ).toString(); // Generate MD5 hash
    const filePath = path.join(cacheFolder, lang, `${hash}.json`); // Construct file path
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(data),{ flag: 'w+' }); // Write data to file
    } catch (error) {
      console.error('Error writing cache:', error);
    }
  },

  async read(lang, keyData) {
    const hash = CryptoJS.MD5(JSON.stringify( keyData ) ).toString() // Generate MD5 hash
    const filePath = path.join(cacheFolder, lang, `${hash}.json`); // Construct file path
    try {
      const fileContent = await fs.readFile(filePath, 'utf8'); // Read file content
      return JSON.parse(fileContent); // Parse JSON content
    } catch (error) {
      return null; // Return null if there's an error
    }
  },
};

export default $cache