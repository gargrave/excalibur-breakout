let currentScore = 0

function reset() {
  currentScore = 0
}

function add(amt: number) {
  currentScore += amt
}

function getCurrent() {
  return currentScore
}

export const Score = {
  add,
  getCurrent,
  reset,
}
