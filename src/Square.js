import React from "react"

export function Square({ value, isActive }) {
  let className = "square"
  if (isActive) {
    className += " active"
  }
  return <button className={className}>{value}</button>
}
