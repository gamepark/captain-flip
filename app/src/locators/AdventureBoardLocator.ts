import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getCurrentMiniScale, getMiniBoardTablePosition, getPanelSlot, getPanelTablePosition } from '../panels/PanelPosition'
import { getViewedPlayer, isMiniLayout } from './ViewHelper'

class AdventureBoardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (isMiniLayout(context)) {
      const viewed = getViewedPlayer(context)
      const players = context.rules.players
      if (location.player === viewed) {
        const { x } = getPanelTablePosition(1, players.length)
        return { x, y: 13 }
      }
      const viewedIndex = players.indexOf(viewed)
      const playerIndex = players.indexOf(location.player as number)
      const slot = getPanelSlot(playerIndex, viewedIndex, players.length)
      return getMiniBoardTablePosition(slot, players.length)
    }
    // 2 players: first player on the left, second on the right.
    const players = context.rules.players
    const playerIndex = players.indexOf(location.player as number)
    if (playerIndex === 0) return { x: -19, y: 13 }
    if (playerIndex === 1) return { x: 19, y: 13 }
    return { x: 0, y: 13 }
  }

  placeItem(item: MaterialItem, context: import('@gamepark/react-game').ItemContext) {
    const transform = super.placeItem(item, context)
    if (isMiniLayout(context) && item.location.player !== getViewedPlayer(context)) {
      const scale = getCurrentMiniScale(context.rules.players.length)
      transform.push(`scale(${scale})`)
    }
    return transform
  }
}

export const adventureBoardLocator = new AdventureBoardLocator()
