import term from 'terminal-kit';

const { terminal } = term;

export const showLoader = async () => {
  terminal.clear();
  const spinner = await terminal.spinner('unboxing-color');
  terminal(' Loading... ');
};
