import React from "react"

export function PrizeTableRow({ rule }) {
  return (
    <tr className="prize-table-row">
      <td>
        {rule[0]} {rule[1]} {rule[2]}
      </td>
      <td>{rule[3]}</td>
      <td>{rule[3] * 2}</td>
      <td>{rule[3] * 3}</td>
    </tr>
  )
}
