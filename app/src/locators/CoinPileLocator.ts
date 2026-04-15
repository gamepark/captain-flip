import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class CoinPileLocator extends PileLocator {
  radius = 1

  isThereTreasureMapOnInitialPosition(context: MaterialContext)  {
    return context.rules.material(MaterialType.TreasureMapToken)
      .location(LocationType.TreasureMapToken).length > 0

  }

  getCoordinates(location: Location, context: MaterialContext) {
    const isOnInitialPosition = this.isThereTreasureMapOnInitialPosition(context)
    let coordinates = { x: 0, y: isOnInitialPosition ? 7 : 5, z: 0 }

    const deltaX = 2.5
    const deltaY = isOnInitialPosition ? 2 : 2.5
    if (location.id === 10) {
      coordinates.x += deltaX
      coordinates.y += deltaY
    } else if (location.id === 5) {
      coordinates.x -= deltaX
      coordinates.y += deltaY
    } else if (location.id === 3) {
      coordinates.x += deltaX
      coordinates.y -= deltaY
    } else {
      coordinates.x -= deltaX
      coordinates.y -= deltaY
    }

    return coordinates
  }

  getPositionDependencies(location: Location, context: MaterialContext): unknown {
    return [super.getPositionDependencies(location, context), this.isThereTreasureMapOnInitialPosition(context)]
  }
}

export const coinPileLocator = new CoinPileLocator()
