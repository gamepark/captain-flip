import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { isPlayerVisible } from './ViewHelper'

class AdventureBoardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const me = context.player ?? context.rules.players[0]
    if (location.player === me) return { x: -19, y: 13 }
    return { x: 19, y: 13 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (!isPlayerVisible(item, context)) return [...transforms, 'scale(0.001)']
    return transforms
  }
}

export const adventureBoardLocator = new AdventureBoardLocator()
