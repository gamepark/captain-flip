/** @jsxImportSource @emotion/react */
import { LocationContext, PileLocator } from '@gamepark/react-game'
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
  coordinates = { x: 0, y: -10, z: 0 }
  getCoordinates(_item :MaterialItem, context: LocationContext) {
    if (context.rules.players.length === 2) {
      return { x: 0, y: 7, z: 0 }
    }

    if (context.rules.players.length === 5) {
      return { x: 7, y: 14, z: 0 }
    }

    return this.coordinates
  }

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const coinPileLocator = new CoinPileLocator()