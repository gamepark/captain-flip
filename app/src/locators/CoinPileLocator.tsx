/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { LocationContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { CoinPileDescription } from './descriptions/CoinPileDescription'

export class CoinPileLocator extends PileLocator {
  locationDescription = new CoinPileDescription()
  radius = 1

  getCoordinates(item: MaterialItem, context: LocationContext) {
    let coordinates = { x: 0, y: -10, z: 0 }
    const isOnInitialPosition = context.rules.material(MaterialType.TreasureMapToken).getItem()!.location.type === LocationType.TreasureMapToken
    if (context.rules.players.length === 2) {
      coordinates = { x: 0, y: isOnInitialPosition ? 7 : 5, z: 0 }
    }

    if (context.rules.players.length === 3 || context.rules.players.length === 5) {
      coordinates = { x: 9, y: 14, z: 0 }
    }

    const deltaX = 2.5
    const deltaY = isOnInitialPosition ? 2 : 2.5
    if (item.location.id === 10) {
      coordinates.x += deltaX
      coordinates.y += deltaY
    } else if (item.location.id === 5) {
      coordinates.x -= deltaX
      coordinates.y += deltaY
    } else if (item.location.id === 3) {
      coordinates.x += deltaX
      coordinates.y -= deltaY
    } else {
      coordinates.x -= deltaX
      coordinates.y -= deltaY
    }

    return coordinates
  }
}

export const coinPileLocator = new CoinPileLocator()