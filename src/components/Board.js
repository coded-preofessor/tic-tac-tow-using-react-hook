import React from 'react'
import Square from './Square'
const Board = ({ squares, onClick }) => (
    <div className="board">
      {squares.map((squares,i) => (
                <Square key={i} value={squares} onClick={() => onClick(i)}/>
                ))}
                </div>
  )
export default Board
