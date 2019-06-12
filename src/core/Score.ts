let currentScore = 0

export const Score = {
  reset() {
    currentScore = 0
  },

  add(amt: number) {
    currentScore += amt
  },

  getCurrent() {
    return currentScore
  },
}
