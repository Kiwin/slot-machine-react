import React from "react"
import { PrizeTable } from "./PrizeLegend"
import { SlotMachine } from "./SlotMachine"

/*   Ruleset: [[slot1,slot2,slot3, priceMultiplier] */
const RULES = [
  ["-", "-", "-", 1],
  ["1", "1", "1", 3],
  ["1", "2", "3", 4],
  ["2", "2", "2", 6],
  ["3", "3", "3", 9],
  ["4", "4", "4", 12],
  ["X", "X", "X", 20],
]

const SYMBOLS = ["-", "1", "2", "3", "X"]

export default function App() {
  return (
    <React.Fragment>
      <SlotMachine ruleset={RULES} symbols={SYMBOLS} />
      <PrizeTable ruleset={RULES} />
    </React.Fragment>
  )
}
