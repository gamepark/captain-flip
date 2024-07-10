/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { LocationDescription } from '@gamepark/react-game'

export class CoinPileDescription extends LocationDescription {
  location = coinStockLocation
  width = 9
  ratio = 1
  borderRadius = this.width / 2
  coordinates = { x: 0, y: 0, z: 0 }
}

export const coinStockLocation = { type: LocationType.CoinStock }