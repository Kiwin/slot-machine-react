import React from "react"
import { useState, useReducer } from "react"
import { SlotMachineDisplay } from "./SlotMachineDisplay"
import { SlotMachineControls } from "./SlotMachineControls"

const ACTION = Object.freeze({
  handleBetChanged: "handleBetChanged",
  handleSpin: "handleSpin",
})

function randomizeSquares(squares, symbols) {
  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)]
  }
  return squares.map(() => getRandomSymbol())
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

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function handleSpin(state) {
  const creditsMinusBet = state.credit - state.bet
  const hasEnoughCredits = creditsMinusBet >= 0
  if (!hasEnoughCredits) return state // Nothing happends, return state.

  state.credit -= state.bet
  state.squares = randomizeSquares(state.squares, state.symbols)
  state.reward = calculateRewardFromRules(
    state.squares,
    state.ruleset,
    state.bet
  )
  state.credit += state.reward
  return state
}

function reducer(state, action) {
  switch (action.type) {
    case ACTION.handleBetChanged: {
      console.log(state, action)
      const notEnoughCreditToBet =
        state.credit === 0 || action.bet > state.credit
      if (notEnoughCreditToBet) return state
      return { ...state, bet: action.bet }
    }
    case ACTION.handleSpin: {
      const tempState = deepCopy(state)
      const newState = handleSpin(tempState)
      return { ...state, ...newState }
    }
  }
  throw Error("Unknown action.")
}

export function SlotMachine({ ruleset, symbols }) {
  const [state, dispatch] = useReducer(reducer, {
    squares: randomizeSquares(Array(9).fill(null), symbols),
    bet: 1,
    credit: 100,
    reward: 0,
    ruleset: ruleset,
    symbols: symbols,
  })

  return (
    <React.Fragment>
      <SlotMachineDisplay
        squares={state.squares}
        bet={state.bet}
        credit={state.credit}
        reward={state.reward}
      />
      <SlotMachineControls
        credit={state.credit}
        onSpin={() => {
          dispatch({ type: ACTION.handleSpin })
        }}
        onBetChange={(newBet) => {
          dispatch({ type: ACTION.handleBetChanged, bet: newBet })
        }}
      />
    </React.Fragment>
  )
}
