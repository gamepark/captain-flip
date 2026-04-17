import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getSides, isPlayerVisible } from './ViewHelper'

class AdventureBoardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { left, right } = getSides(context)
    if (location.player === left)  return { x: -19, y: 13 }
    if (location.player === right) return { x:  19, y: 13 }
    return { x: 0, y: 13 }
  }

  hide(item: MaterialItem, context: ItemContext): boolean {
    return !isPlayerVisible(item, context)
  }
}

export const adventureBoardLocator = new AdventureBoardLocator()
