/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { CoinPileDescription } from './descriptions/CoinPileDescription'

export class CoinPileLocator extends PileLocator {
  locationDescription = new CoinPileDescription()
  radius = 2
  coordinates = { x: 0, y: 0, z: 0 }
}

export const coinPileLocator = new CoinPileLocator()