/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { coin10StockLocation, coin1StockLocation, coin3StockLocation, coin5StockLocation } from '../material/CoinDescription'
import { CoinPileDescription } from './descriptions/CoinPileDescription'

export class CoinPileLocator extends PileLocator {
  locations = [
    coin1StockLocation,
    coin3StockLocation,
    coin5StockLocation,
    coin10StockLocation
  ]
  locationDescription = new CoinPileDescription()
  radius = 3
  coordinates = { x: 0, y: 0, z: 0 }

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const coinPileLocator = new CoinPileLocator()