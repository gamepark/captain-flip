import { HandLocator, ItemContext } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { isPlayerVisible } from './ViewHelper'

class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const me = context.player ?? context.rules.players[0]
    // My own hand is always centered between the two boards so I can
    // see it even when my board isn't in one of the two visible slots.
    if (location.player === me) return { x: 0, y: 12.3, z: 5 }
    // Other players' hands are hidden (they're only visible during
    // animations orchestrated by the framework).
    return { x: 0, y: 12.3, z: 5 }
  }

  hide(item: MaterialItem, context: ItemContext): boolean {
    const me = context.player ?? context.rules.players[0]
    if (item.location.player === me) return false
    return !isPlayerVisible(item, context)
  }
}

export const playerHandLocator = new PlayerHandLocator()
