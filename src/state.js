import { languages_list } from './lang/index.js';

class State {
  #currentFolder = null;
  #currentType = 'Single';
  #amountsTypes = ['Single'];
  #formats = ['.srt', '.txt', '.html', '.vtt']
  constructor() {
    this.#currentFolder = process.cwd();
    this.languages = Object.keys(languages_list).reduce((acc, key) => {
      acc[languages_list[key].toLowerCase()] = key;
      return acc;
    }, {});
    this.languageIntoCode = this.languages['russian - русский'];
  }
  getLanguagesArray() {
    return Object.keys(this.languages);
  }
  get formats() {
    return this.#formats;
  }
  getCurrentLanguage() {
    return this.languageIntoCode;
  }

  setLanguageInto(val) {
    if (!this.getLanguagesArray().includes(val)) {
      throw TypeError('This language is not exist');
    }
    if (val.trim().length <= 0) {
      throw Error('Language cant be empty string');
    }
    this.languageIntoCode = this.languages[val];
  }
  getLanguages() {
    return this.languages;
  }
  get currentFolder() {
    return this.#currentFolder;
  }

  setCurrentFolder(newFolder) {
    this.#currentFolder = newFolder;
  }

  setCurrentType(newType) {
    if (!this.#amountsTypes.includes(newType)) {
      throw new TypeError(
        `This type doesnt exist only this type => ${this.#amountsTypes.join(
          ', '
        )}`
      );
    } else {
      this.#currentType = newType;
    }
  }

  get types() {
    return this.#amountsTypes;
  }
}

export const state = new State();