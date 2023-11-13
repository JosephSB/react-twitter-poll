import React, { useState } from 'react';
import ReactTwitterPoll from './ReactTwitterPoll';
import { option } from './ReactTwitterPoll/types/option';

const dataOptions = [
  {
    id: 0,
    text: "Universitario",
    votes: 18
  },
  {
    id: 1,
    text: "Alianza Lima",
    votes: 14
  },
  {
    id: 2,
    text: "Melgar",
    votes: 3
  },
  {
    id: 3,
    text: "Sporting Cristal",
    votes: 15
  }
]

function App() {
  const [options, setOptions] = useState([...dataOptions]);
  //const [optionSelected, setoptionSelected] = useState();

  const handleVote = (item: option) => {
    const tempOptions = [...options];
    const index = tempOptions.findIndex(x => x.id === item.id);
    tempOptions[index].votes = tempOptions[index].votes + 1
    setOptions([...tempOptions])
  }

  return (
    <div className="App">
      <br />
      <ReactTwitterPoll
        title='¿Cual es tu equipo favorito de la Liga 1?'
        options={options}
        onVote={handleVote}
        //optionSelected={options[2]}
      />
    </div>
  );
}

export default App;
