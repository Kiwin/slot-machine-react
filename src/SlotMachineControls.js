import React from "react"

export function SlotMachineControls({ onBetChange, onSpin, credit }) {
  const hasAnyCredit = credit <= 0
  return (
    <div className="controls">
      <button disabled={hasAnyCredit} onClick={() => onBetChange(1)}>
        BET 💲
      </button>
      <button disabled={hasAnyCredit} onClick={() => onBetChange(2)}>
        BET 💲💲
      </button>
      <button disabled={hasAnyCredit} onClick={() => onBetChange(3)}>
        BET 💲💲💲
      </button>
      <button disabled={hasAnyCredit} onClick={() => onBetChange(credit)}>
        BET MAX💰
      </button>
      <button disabled={hasAnyCredit} onClick={() => onSpin()}>
        SPIN! 🔄
      </button>
    </div>
  )
}
