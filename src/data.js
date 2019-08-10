



const firstCardData = {
    id: 1,
    title: 'Add header',
    text: `Example data  
  let's render this
  abcdefg`
  }
  
  const secondCardData = {
    id: 2,
    title: 'Add users',
    text: `# Second card  
  some INTeresting stuff`}
  
  const initial = [firstCardData, secondCardData];
  
  
  const secondColumnData = { id: 3, title: 'Add nav drawer', text: `This data will be on the second column` };
  const secondColumn = [secondColumnData];
  
  
  
  
  export let columns = [
    {
      name: 'Todo',
      data: initial,
    },
    {
      name: 'In progress',
      data: secondColumn,
    },
    {
      name: 'Done',
      data: []
    }
  ];
  