import React from "react"
import { PrizeTableRow } from "./PrizeTableRow"

export function PrizeTable({ ruleset }) {
  return (
    <div className="prize-table">
      <h1>=== PRIZE LEGEND ===</h1>
      <table className="prize-table">
        <tr className="prize-table-row-header">
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
