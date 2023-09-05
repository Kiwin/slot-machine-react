import React from "react"

export function SlotMachineControls({ onBetChange, onSpin }) {
  return (
    <div className="controls">
      <button onClick={() => onBetChange(1)}>BET 💲</button>
      <button onClick={() => onBetChange(2)}>BET 💲💲</button>
      <button onClick={() => onBetChange(3)}>BET 💲💲💲</button>
      <button onClick={() => onSpin()}>SPIN! 🔄</button>
    </div>
  )
}
