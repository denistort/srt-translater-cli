import term from 'terminal-kit';

const { terminal } = term;

export const showSucces = (str) => {
  terminal.clear();
  terminal.white('SUCCES SAVED INTO =>', str);
};
