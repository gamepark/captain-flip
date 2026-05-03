import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { isItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPanelTablePosition } from '../panels/PanelPosition'
import { isMiniLayout } from './ViewHelper'
import { ClothBagDescription } from './descriptions/ClothBagDescription'

class ClothBagLocator extends Locator {
  limit = 100
  locationDescription = new ClothBagDescription()
  location = { type: LocationType.ClothBag }

  getCoordinates(_: Location, context: MaterialContext) {
    const z = isItemContext(context) ? 0 : 5
    if (isMiniLayout(context)) {
      // Left of the viewed central board (board centred on slot 1).
      const { x: centralX } = getPanelTablePosition(1, context.rules.players.length)
      const offset = context.rules.players.length === 3 ? 25 : 17.8
      return { x: centralX - offset, y: 20.4, z }
    }
    return { x: 0, y: 20, z }
  }
}

export const clothBagLocator = new ClothBagLocator()
