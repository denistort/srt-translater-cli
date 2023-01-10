import term from 'terminal-kit';

const { terminal } = term;

export const getLanguage = async (languagesList, err = null) => {
  return new Promise(res => {
    terminal.clear();
  
    terminal.cyan('1/3 \n');
  
    terminal.yellow('Click the tab for autocomplete \n');
    
    if (err) {
      terminal.red(err, '\n');
    }

    terminal('Please enter language: ');
  
    terminal.inputField(
      {
        history: [],
        autoComplete: languagesList,
        autoCompleteMenu: true,
        autoCompleteHint: true,
      },
      (_, input) => {
        res(input)
      }
    );

  })
};
