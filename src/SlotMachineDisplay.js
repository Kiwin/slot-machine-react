import React from "react"
import { Square } from "./Square"

export function SlotMachineDisplay({ squares, bet, credit, reward }) {
  const hasAnyCredit = credit <= 0
  return (
    <div className="display">
      <div>
        <div className="board-row">
          <Square value={squares[0]} />
          <Square value={squares[1]} />
          <Square value={squares[2]} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} isActive={true} />
          <Square value={squares[4]} isActive={true} />
          <Square value={squares[5]} isActive={true} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} />
          <Square value={squares[7]} />
          <Square value={squares[8]} />
        </div>
      </div>
      <div className={bet > credit ? "error" : ""}>💰 {credit}</div>
      <div className={bet > credit ? "warning" : ""}>
        BET: {hasAnyCredit || bet === credit ? "💰" : "💲".repeat(bet)}
      </div>
      <div className={reward ? "highlight" : ""}>REWARD: {reward}</div>
    </div>
  )
}
