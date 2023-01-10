#!/usr/bin/env node
import { writeFile } from 'fs/promises';
import * as nodePath from 'path';
import { readFile } from './helpers/readFile.js';
import { state } from './state.js';
import { translateService } from './translate-service/index.js';
import { getLanguage } from './views/getLanguage.js';
import { getTypeView } from './views/getTypeView.js';
import { selectFileView } from './views/selectFileView.js';
import { showGreetings } from './views/showGreetings.js';
import { showLoader } from './views/showLoader.js';
import { showSucces } from './views/showSucces.js';

const POST_FIX = '-translated-into-';

const startCLI = async () => {
  // FINAL CALL
  const onGetFile = async ({ path, fileName }) => {
    const resText = await readFile(path);
    showLoader();
    const translatedText = await translateService(
      resText,
      state.getCurrentLanguage()
    );

    const pathWithoutFileName = path.split(nodePath.basename(path))[0];
    const newFilename =
      fileName.split(nodePath.extname(path))[0] +
      POST_FIX +
      state.getCurrentLanguage() +
      nodePath.extname(path);

    const contactFilenameAndPath = nodePath.join(
      pathWithoutFileName,
      newFilename
    );
    await writeFile(contactFilenameAndPath, translatedText);
    showSucces(contactFilenameAndPath);

    setTimeout(() => {
      process.exit();
    }, 2000);
  };

  await showGreetings();
  
  try {
    const currentLang = await getLanguage(state.getLanguagesArray());
    state.setLanguageInto(currentLang)
  } catch (error) {
    const currentLang = await getLanguage(state.getLanguagesArray(), error.message);
    state.setLanguageInto(currentLang)
  }
  
  const selectedVar = await getTypeView({ items: state.types });
  
  state.setCurrentType(selectedVar);
  
  await selectFileView(state.currentFolder, onGetFile);
};

startCLI();
