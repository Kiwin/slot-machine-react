import React from "react"
import { useState } from "react"

/*   Ruleset: [[slot1,slot2,slot3, priceMultiplier] */
const RULES = [
  ["1", "1", "1", 3],
  ["2", "2", "2", 6],
  ["3", "3", "3", 9],
  ["4", "4", "4", 12],
  ["X", "X", "X", 20],
]

const SYMBOLS = [" ", "1", "2", "3", "X"]

export default function App() {
  return (
    <React.Fragment>
      <SlotMachine ruleset={RULES} symbols={SYMBOLS} />
      <PrizeLegend ruleset={RULES} />
    </React.Fragment>
  )
}

function SlotMachine({ ruleset, symbols }) {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [bet, setBet] = useState(1)
  const [credit, setCredit] = useState(100)
  const [reward, setReward] = useState(0)

  function handleBetChanged(newBet) {
    if (newBet > credit) return
    setBet(newBet)
  }

  function handleSpin() {
    const _credit = credit
    const _bet = bet
    const _newCredit = _credit - _bet
    if (_newCredit < 0) return

    function getRandomSymbol() {
      return symbols[Math.floor(Math.random() * symbols.length)]
    }

    const _newSquares = squares.map(() => getRandomSymbol())
    const _reward = calculateRewardFromRules(_newSquares, ruleset, _bet)
    //HACK: Only update states once using local variables. Otherwise state is delayed by 1 render.
    setReward(_reward)
    setSquares(_newSquares)
    setCredit(_newCredit + _reward)
  }

  function calculateRewardFromRules(squares, ruleset, bet) {
    const lines = [
      //horizontals
      //[0, 1, 2],
      [3, 4, 5],
      //[6, 7, 8],

      /*
      //verticals
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //diagonals
      [0, 4, 8],
      [2, 4, 6],
      */
    ]

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < ruleset.length; j++) {
        const [a, b, c] = lines[i]
        const rule = ruleset[j]
        if (
          squares[a] == rule[0] &&
          squares[b] == rule[1] &&
          squares[c] == rule[2]
        ) {
          const reward = bet * rule[3]
          return reward
        }
      }
    }
    return 0
  }

  return (
    <React.Fragment>
      <Display squares={squares} bet={bet} credit={credit} reward={reward} />
      <Controls
        onSpin={(spinsToPerform) => {
          handleSpin()
        }}
        onBetChange={(newBet) => {
          handleBetChanged(newBet)
        }}
      />
    </React.Fragment>
  )
}

function Controls({ onBetChange, onSpin }) {
  return (
    <div className="controls">
      <button onClick={() => onBetChange(1)}>BET 💲</button>
      <button onClick={() => onBetChange(2)}>BET 💲💲</button>
      <button onClick={() => onBetChange(3)}>BET 💲💲💲</button>
      <button onClick={() => onSpin()}>SPIN! 🔄</button>
    </div>
  )
}

function Display({ squares, bet, credit, reward }) {
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
        BET: {"💲".repeat(bet)}
      </div>
      <div className={reward ? "highlight" : ""}>REWARD: {reward}</div>
    </div>
  )
}

function Square({ value, isActive }) {
  let className = "square"
  if (isActive) {
    className += " active"
  }
  return <button className={className}>{value}</button>
}

function PrizeLegend({ ruleset }) {
  return (
    <div className="prize-legend">
      <h1>=== PRIZE LEGEND ===</h1>
      <table className="prize-legend-table">
        <tr className="prize-legend-row-header">
          <td>COMBO</td>
          <td>💲</td>
          <td>💲💲</td>
          <td>💲💲💲</td>
        </tr>
        {ruleset.map((rule) => {
          return <PrizeTableRow rule={rule} />
        })}
      </table>
    </div>
  )
}

function PrizeTableRow({ rule }) {
  return (
    <tr className="prize-legend-row">
      <td>
        {rule[0]} {rule[1]} {rule[2]}
      </td>
      <td>{rule[3]}</td>
      <td>{rule[3] * 2}</td>
      <td>{rule[3] * 3}</td>
    </tr>
  )
}
