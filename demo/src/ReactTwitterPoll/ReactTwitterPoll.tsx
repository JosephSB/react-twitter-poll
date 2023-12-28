import React, { useCallback, useMemo, useState } from 'react';
import './styles.css';
import { option } from './types/option';

interface props {
  options: option[]
  title?: string
  footerVisible?: boolean
  onVote: (option: option) => void
  optionSelected?: option
  className?: string

  CustomTitle?: ({ title }: { title?: string }) => JSX.Element
  CustomFooter?: ({ totalVotes }: { totalVotes: number }) => JSX.Element
  CustomOption?: ({ item, onClick }: { item: option, onClick: () => void }) => JSX.Element
  CustomOptionSelected?: ({ item, percentVotes, isSelected }: { item: option, percentVotes: number, isSelected: boolean }) => JSX.Element
}

const ReactTwitterPoll = (props: props) => {
  const {
    title, options, footerVisible = true,
    onVote, optionSelected, className,

    CustomTitle, CustomFooter, CustomOption,
    CustomOptionSelected
  } = props
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

  const calcPercent = useCallback((votes: number) => {
    let percent = Math.round((votes / totalVotes));
    if(!percent) return 0
    return percent * 100;
  }, [totalVotes]);

  if (isVoted) {
    return (
      <div className={className ? className : 'container-survey'}>
        {title && (CustomTitle ? <CustomTitle title={title} /> : <p className='survey-title'>{title}</p>)}
        {
          options.map((item) =>
            CustomOptionSelected
              ?
              <CustomOptionSelected
                key={item.id}
                item={item}
                percentVotes={calcPercent(item.votes)}
                isSelected={selected?.id === item.id}
              />
              : (
                <div
                  key={item.id}
                  className={`option-result-survey ${selected?.id === item.id ? "active" : ""}`}
                >
                  <div className='progress-survey' style={{ width: `${calcPercent(item.votes)}%` }}></div>
                  <p>{item.text}</p>
                  <p>{calcPercent(item.votes)} %</p>
                </div>
              ))
        }
        {footerVisible && (CustomFooter ? <CustomFooter totalVotes={totalVotes} /> : <p className='footer-survey'>{totalVotes} votes</p>)}
      </div>
    )
  }

  return (
    <div className={className ? className : 'container-survey'}>
      {title && (CustomTitle ? <CustomTitle title={title} /> : <p className='survey-title'>{title}</p>)}
      {
        options.map((item) =>
          CustomOption
            ? <CustomOption key={item.id} onClick={() => handleVote(item)} item={item} />
            : (
              <button
                key={item.id}
                onClick={() => handleVote(item)}
                className='option-survey'
              >
                {item.text}
              </button>
            ))
      }
      {footerVisible && (CustomFooter ? <CustomFooter totalVotes={totalVotes} /> : <p className='footer-survey'>{totalVotes} votes</p>)}
    </div>
  )
}

export default ReactTwitterPoll
