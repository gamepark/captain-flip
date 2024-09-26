import { getEnumValues } from '@gamepark/rules-api'

export enum Coin {
  Coin1 = 1,
  Coin3 = 3,
  Coin5 = 5,
  Coin10 = 10
}

export const coinValues = getEnumValues(Coin)
