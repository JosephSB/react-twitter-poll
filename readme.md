# React Twitter Poll

React-Twitter-Poll is a React library for creating polls like Twitter or Facebook. It is easy to use and flexible, and allows developers to create polls of different types, with different visualization options and analysis data.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/salalo/react-leaf-polls/blob/master/LICENSE)

# ![](gift-twitter-poll.gif)

## Install

### NPM

```bash
npm i react-twitter-poll
```

### Yarn

```bash
yarn add react-twitter-poll
```

## Usage

```ts
import React, { useState } from 'react';
import ReactTwitterPoll from 'react-twitter-poll';
import 'react-twitter-poll/dist/index.css';

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

```

## Component Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| options | option | ✔ | undefined  |  An array of objecst to vote on with keys "id", "text" and "votes" |
| title | string | ✖ | undefined | The title of the poll |
| footerVisible |  boolean | ✖ | true | Whether or not to show a footer with the total number of votes |
| onVote | (option: option) => void | ✔ | undefined | A callback function that is called when an option is selected |
| optionSelected | option | ✖ | undefined | The selected option |
| className | string | ✖ | undefined | A CSS class to apply to the poll container |
| CustomTitle | ({ title }: { title?: string }) => JSX.Element | ✖ | undefined  | A custom component to render the title of the poll |
| CustomFooter | ({ totalVotes }: { totalVotes: number }) => JSX.Element | ✖ | undefined | A custom component to render the footer of the poll |
| CustomOption | 	({ item, onClick }: { item: option, onClick: () => void }) => JSX.Element | ✖ | undefined | A custom component to render an option |
| CustomOptionSelected | ({ item, percentVotes, isSelected }: { item: option, percentVotes: number, isSelected: boolean }) => JSX.Element | ✖ | undefined | A custom component to render a selected option |


## License

MIT © [JosephSB](https://github.com/JosephSB)
