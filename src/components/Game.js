import React, { useState } from 'react'
import { calculateWinner } from '../helper'
import Board from './Board'
import Alert from '@material-ui/lab/Alert';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Button from '@material-ui/core/Button';


const Game = () => {

  const [history, sethistory] = useState([Array(9).fill(null)])
  const [stepNumber, setstepNumber] = useState(0)
  const [xisNext, setxisNext] = useState(true)
  const winner = calculateWinner(history[stepNumber])
  let move_num = 0
  const xO = xisNext ? 'X' : 'O'

  const handleClick = (i) => {
    const historyPoint = history.slice(0,stepNumber+1)
    const current = historyPoint[stepNumber]
    const squares = [...current]
    // return if won or occupied
    if (winner || squares[i]) return 
    // select the square
    squares[i] = xO
    sethistory([...historyPoint,squares])
    setstepNumber(historyPoint.length)
    setxisNext(!xisNext)
  }

    const jumpTo = (step,won) => {
      if(winner && won) 
      {
        sethistory([Array(9).fill(null)])
        setstepNumber(0)
      }
      else{
        if(!won)
        {
          setstepNumber(step)
          setxisNext(step%2 === 0 )
        }
        else
        {
          sethistory([Array(9).fill(null)])
          setstepNumber(0)
        }
      }
    }

    const renderMove = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Go to start'
      move_num = move
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move,false)}>{destination}</button>
        </li>
      )
    })

    const checkWinner = () => {
      if(winner) {
        return( 
        <Alert style={{ marginTop:'30px' }}  icon={<SentimentVerySatisfiedIcon fontSize="inherit" />} action={
          <Button onClick={()=>{jumpTo(0,true)}} color="inherit" size="small">
            Play Again
          </Button>
        }>Winner is player  {winner} !</Alert>)
      }
      
      else if( move_num===9)  return( 
        <Alert style={{ marginTop:'30px' }}  icon={<SentimentVeryDissatisfiedIcon fontSize="inherit" />} action={
          <Button onClick={()=>{jumpTo(0,true)}} color="inherit" size="small">
            Play Again
          </Button>
        }>Match is Drawn  {winner} !</Alert>)
      
    }
  return (
    <>
        <h1>React Tic Tac Toe- With Hooks</h1>
    <div className="parent">
        <Board squares = {history[stepNumber]} onClick={handleClick}/>
        <div className="info-wrapper">
          <div>
            <h3>History</h3>
            {renderMove()}
          </div>
          <h3>{winner ? 'Winner ' + winner : move_num===9? 'Match is Draw' : 'Next Player ' + xO}</h3>
        </div>
      </div>
      {checkWinner()}
    </>
  )
}

export default Game
