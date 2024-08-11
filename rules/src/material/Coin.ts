import mapValues from 'lodash/mapValues'
import { isEnumValue } from '@gamepark/rules-api'

export enum Coin {
  Coin1 = 1,
  Coin3 = 3,
  Coin5 = 5,
  Coin10 = 10
}

export const coinValues = Object.values(Coin).filter<Coin>(isEnumValue)

export const spendCoinsDelta = (owned: Record<Coin, number>, spend = 1): Record<Coin, number> => {
  const delta = mapValues(owned, _ => 0)
  for (let _ = 0; _ < spend; _++) {
    for (const coin of coinValues) {
      if (owned[coin] + delta[coin] > 0) {
        delta[coin]--
        if (coin > 1) {
          let rest = coin - 1
          for (const lowerCoin of coinValues.slice(0, coinValues.indexOf(coin)).reverse()) {
            if (lowerCoin <= rest) {
              delta[lowerCoin] += Math.floor(rest / lowerCoin)
              rest -= rest % lowerCoin
            }
          }
        }
        break
      }
    }
  }
  return delta
}