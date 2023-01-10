import term from 'terminal-kit';

const { terminal } = term;

const exampleItems = ['a. Go south', 'b. Go west', 'c. Go back to the street'];

export const getTypeView = ({ items = exampleItems }) => {
  return new Promise((res, rej) => {
    terminal.clear();
    terminal.cyan('2/3 \n');
    terminal.white('First of all you need to choose the type.\n');
    terminal.white('Type can be Single or Group of Files\n');
  
    terminal.singleColumnMenu(items, (err, response) => {
      if (err) {
        rej(err) 
      } else {
        res(response.selectedText);
      }
    });
  })
};
