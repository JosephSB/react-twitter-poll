import React, { useMemo, useState } from 'react';
import './styles.css';
import { option } from './types/option';

interface props {
  options: option[]
  title?: string
  footerVisible?: boolean
  onVote: (option: option) => void
  optionSelected?: option
}

const ReactTwitterPoll = ({ title, options, footerVisible = true, onVote, optionSelected }: props) => {
  const [selected, setSelected] = useState(optionSelected ? optionSelected : null);
  const [isVoted, setIsVoted] = useState(optionSelected ? true : false);

  const totalVotes = useMemo(() => {
    let total = 0;
    for (let i = 0; i < options.length; i++) {
      total += options[i].votes
    }
    return total;
  }, [options]);

  const handleVote = (item: option) => {
    onVote(item)
    setIsVoted(true)
    setSelected(item)
  }

  if (isVoted) {
    return (
      <div className='container-survey'>
        {title && <p className='survey-title'>{title}</p>}
        {
          options.map((item) => (
            <div
              key={item.id}
              className={`option-result-survey ${selected?.id === item.id ? "active" : ""}`}
            >
              <div className='progress-survey' style={{width: `${Math.round( (item.votes/totalVotes) * 100 )}%`}}></div>
              <p>{item.text}</p>
              <p>{Math.round( (item.votes/totalVotes) * 100 )} %</p>
            </div>
          ))
        }
        {footerVisible && <p className='footer-survey'>{totalVotes} votes</p>}
      </div>
    )
  }

  return (
    <div className='container-survey'>
      {title && <p className='survey-title'>{title}</p>}
      {
        options.map((item) => (
          <button
            key={item.id}
            onClick={() => handleVote(item)}
            className='option-survey'
          >
            {item.text}
          </button>
        ))
      }
      {footerVisible && <p className='footer-survey'>{totalVotes} votes</p>}
    </div>
  )
}

export type { option }
export default ReactTwitterPoll
