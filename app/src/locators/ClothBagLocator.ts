/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { isItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '../../../../rules-api/src'
import { ClothBagDescription } from './descriptions/ClothBagDescription'

class ClothBagLocator extends Locator {
  limit = 100
  locationDescription = new ClothBagDescription()
  location = { type: LocationType.ClothBag }

  getCoordinates(_: Location, context: MaterialContext) {
    if (context.rules.players.length === 2) {
      return { x: 0, y: 20, z: isItemContext(context) ? 0 : 5 }
    }

    if (context.rules.players.length === 3 || context.rules.players.length === 5) {
      return { x: -8, y: 14, z: isItemContext(context) ? 0 : 5 }
    }

    return this.coordinates
  }
}

export const clothBagLocator = new ClothBagLocator()