import React, { useState} from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const StatisticLine = (props) => (
  <tbody>
  <tr>
  <td>{props.text}</td> 
  <td>{props.value}</td>
  <td>{props.symbol}</td>
  </tr>
  </tbody>
)

const Statistics = (props) => {
  //console.log(props)
  if(props.all === 0) {
    return (
      <div>
        No Feedback given
      </div>
    )
  }
  return(
  <div>
  <table>
  <StatisticLine text="good" value={props.good}/>
  <StatisticLine text="neutral" value={props.neutral}/>
  <StatisticLine text="bad" value={props.bad}/>
  <StatisticLine text="all" value={props.all}/>
  <StatisticLine text="average" value={props.avg}/>
  <StatisticLine text="positive" value={props.pos} symbol={props.sym}/>
  </table>
  </div>
  )
}

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = "give feedback"
  const stat = "statistics"


  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  const total = good+neutral+bad
  const avg = (good-bad)/total
  const pos = (good/total) * 100

  return (
    <div>
     <h1>{title}</h1>
    <Button handleClick={handleGoodFeedback} text="good"/>
    <Button handleClick={handleNeutralFeedback} text="neutral"/>
    <Button handleClick={handleBadFeedback} 
    text="bad"/>
     <h2>{stat}</h2>
     <Statistics good={good} neutral={neutral} bad={bad} all={total} avg={avg} pos={pos} sym="%" /> 
    </div>
  )
}

export default App;
