import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(7).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const castVote = (select) => {
    //console.log("casting vote for", select)
    const copy = [...votes]
    copy[select] += 1
    setVotes(copy)
    //console.log(Math.max(...votes))
    if (votes[select] === Math.max(...votes)) {
      setMostVotes(select)
    }
    //console.log("votes are ", votes)
  }

 

  return (
    <div>
    <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <Button handleClick={() => castVote(selected)} text="vote"/>
    <Button handleClick={randomAnecdote} text="random anecdote"/>
    <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
      <br/>
      has {votes[mostVotes]} votes
    </div>
  )
}

export default App