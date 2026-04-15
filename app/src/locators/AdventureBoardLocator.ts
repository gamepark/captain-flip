import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getSides, isPlayerVisible } from './ViewHelper'

class AdventureBoardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { left, right } = getSides(context)
    if (location.player === left)  return { x: -19, y: 13 }
    if (location.player === right) return { x:  19, y: 13 }
    // Hidden boards (not currently on either deck) are parked at the
    // center so they don't stack invisibly under the right-side board.
    return { x: 0, y: 13 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (!isPlayerVisible(item, context)) return [...transforms, 'scale(0.001)']
    return transforms
  }
}

export const adventureBoardLocator = new AdventureBoardLocator()
