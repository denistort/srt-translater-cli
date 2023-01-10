import term from 'terminal-kit';
import fs from 'fs/promises';
import { join, extname } from 'path';
import { isFolder } from '../helpers/isFolder.js';
import { state } from '../state.js';

const { terminal } = term;
const GO_BACK = '../goback';
const ext = state.formats;

export const selectFileView = async (path, cb, err = null) => {
  terminal.clear();
  terminal.cyan('3/3 \n');
  const items = await fs.readdir(path);
  const onSelectHandler = async (_, response) => {
    const selected = join(path, response.selectedText);
    const goBack = join(path, '../');
    const isFolderOrNot = isFolder(join(path, response.selectedText));

    if (isFolderOrNot) {
      return selectFileView(selected, cb);
    }
    if (response.selectedText === GO_BACK) {
      return selectFileView(goBack, cb);
    } else {
      if (!ext.includes(extname(selected))) {
        return selectFileView(path, cb, true);
      }
      return cb({ path: selected, fileName: response.selectedText });
    }
  };
  terminal.cyan('Choose a file:\n');
  terminal.cyan(`Current Directory: ${path}\n`);
  if (err)
    terminal.red(
      'Only these file types are allowed: ',
      ext.join(', '),
      ' 💥💥💥!!!' + '\n'
    );
  terminal.gridMenu([GO_BACK, ...items], onSelectHandler);
};
