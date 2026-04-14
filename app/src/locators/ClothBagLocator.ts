import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { isItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { ClothBagDescription } from './descriptions/ClothBagDescription'

class ClothBagLocator extends Locator {
  limit = 100
  locationDescription = new ClothBagDescription()
  location = { type: LocationType.ClothBag }

  getCoordinates(_: Location, context: MaterialContext) {
    return { x: 0, y: 20, z: isItemContext(context) ? 0 : 5 }
  }
}

export const clothBagLocator = new ClothBagLocator()
