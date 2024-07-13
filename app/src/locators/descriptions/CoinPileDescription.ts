/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'

export class CoinPileDescription extends LocationDescription {
  width = 9
  ratio = 1
  borderRadius = this.width / 2
  coordinates = { x: 0, y: 0, z: 0 }
}