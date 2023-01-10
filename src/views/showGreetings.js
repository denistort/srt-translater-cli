import term from 'terminal-kit';

const { terminal } = term;

export const showGreetings = () => {
  return new Promise((res) => {
    terminal.clear();
    terminal.cyan('Welcome to translate cli! 😉 \n');

    terminal(' Loading... ');
    setTimeout(() => {
      terminal.clear();
      res();
    }, 3000);
  });
};
