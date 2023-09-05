import React from "react"
import { useState } from "react"
import { SlotMachineDisplay } from "./SlotMachineDisplay"
import { SlotMachineControls } from "./SlotMachineControls"

export function SlotMachine({ ruleset, symbols }) {
  const [squares, setSquares] = useState(randomizeSquares(Array(9).fill(null)))
  const [bet, setBet] = useState(1)
  const [credit, setCredit] = useState(100)
  const [reward, setReward] = useState(0)

  function handleBetChanged(newBet) {
    if (newBet > credit) return
    setBet(newBet)
  }

  function randomizeSquares(squares) {
    function getRandomSymbol() {
      return symbols[Math.floor(Math.random() * symbols.length)]
    }
    return squares.map(() => getRandomSymbol())
  }

  function handleSpin() {
    const creditsMinusBet = credit - bet
    const hasEnoughCredits = creditsMinusBet > 0
    if (!hasEnoughCredits) return

    setCredit((credit) => credit - bet)
    setSquares((squares) => randomizeSquares(squares))
    setReward(() => calculateRewardFromRules(squares, ruleset, bet))
    setCredit((credit) => credit + reward)
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
          return bet * rule[3]
        }
      }
    }
    return 0
  }

  return (
    <React.Fragment>
      <SlotMachineDisplay
        squares={squares}
        bet={bet}
        credit={credit}
        reward={reward}
      />
      <SlotMachineControls
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
