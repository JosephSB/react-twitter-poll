import React, { useState } from 'react';
import ReactTwitterPoll from './ReactTwitterPoll';
//import ReactTwitterPoll from 'react-twitter-poll';
//import 'react-twitter-poll/dist/index.css';

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

  const handleVote = (item: any) => {
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
        //CustomOption={(props) => <button onClick={props.onClick} style={{backgroundColor: "yellowgreen"}}>{props.item.text}</button>}
        //CustomTitle={(props) => <h1>{props.title}</h1>}
        //optionSelected={options[2]}
      />
    </div>
  );
}

export default App;
