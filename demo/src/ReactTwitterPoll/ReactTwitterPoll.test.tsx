import React from 'react';
import ReactTwitterPoll from './ReactTwitterPoll';
import { render, screen, fireEvent } from '@testing-library/react'
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

  const mockOnVote = jest.fn(x => 42 + x);
  test("Should be exec function onVote when clicking option", () => {
    render(
      <ReactTwitterPoll
        options={testOptions}
        onVote={mockOnVote}
      />
    );

    fireEvent.click(screen.getByText('test 1'));

    expect(mockOnVote.mock.calls).toHaveLength(1);
  });

  test("Should be render total votes when clicking option", () => {
    render(
      <ReactTwitterPoll
        options={testOptions}
        onVote={() => { }}
      />
    );

    fireEvent.click(screen.getByText('test 1'))
    const totalTestVotes = testOptions.reduce((a, b) => a + b.votes, 0);

    expect(screen.getByText(`${totalTestVotes} votes`)).toBeInTheDocument();
  });

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
