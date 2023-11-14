import React from 'react';
import ReactTwitterPoll from './ReactTwitterPoll';
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';

const testOptions = [
  {
    id: 0,
    text: "test 1",
    votes: 5
  },
  {
    id: 1,
    text: "test 2",
    votes: 5
  },
  {
    id: 2,
    text: "test 3",
    votes: 1
  }
]

describe("Testing Component React Twitter Poll", () => {

  test("Render Content", () => {
    render(
      <ReactTwitterPoll
        options={testOptions}
        onVote={() => { }}
      />
    );
  });

  test("Should render if options is an empty array", () => {
    render(
      <ReactTwitterPoll
        options={[]}
        onVote={() => { }}
      />
    );
  });

  /*test("It should increase votes (+1) if you click on an option", () => {
    render(
      <ReactTwitterPoll
        options={testOptions}
        onVote={() => { }}
      />
    );
    //console.log(screen.getByText('test 1'))
    fireEvent.click(screen.getByText('test 1'))
    console.log(screen)
    const totalTestVotes = testOptions.reduce((a, b) => a + b.votes, 0);

    screen.getByText(`${totalTestVotes} votes`)
    //expect(screen.getByText(`${totalTestVotes + 1} votes`)).toHaveTextContent('hello there')
  });*/

  test("Should be render a custom title", () => {
    const testTitle = "test title"
    render(
      <ReactTwitterPoll
        title={testTitle}
        options={testOptions}
        onVote={() => { }}
        CustomTitle={(props) => <h1>{props.title} custom</h1>}
      />
    );

    expect(screen.getByRole("heading")).toHaveTextContent(`${testTitle} custom`)
  });

  test("Should be render a custom footer", () => {
    render(
      <ReactTwitterPoll
        options={testOptions}
        onVote={() => { }}
        CustomFooter={(props) => <h1>{props.totalVotes} custom votes</h1>}
      />
    );
    const totalTestVotes = testOptions.reduce((a, b) => a + b.votes, 0);
    expect(screen.getByRole("heading")).toHaveTextContent(`${totalTestVotes} custom votes`)
  });

});
