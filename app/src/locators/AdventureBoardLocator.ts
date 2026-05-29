import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
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
    // 2 players: the connected player is always shown on the left, the
    // opponent on the right. Spectators fall back to turn order (player[0]
    // left). Uses the me-relative index so panel and board match.
    const relativeIndex = getRelativePlayerIndex(context, location.player as PlayerId)
    if (relativeIndex === 0) return { x: -19, y: 13 }
    if (relativeIndex === 1) return { x: 19, y: 13 }
    return { x: 0, y: 13 }
  }

  placeItem(item: MaterialItem, context: ItemContext) {
    const transform = super.placeItem(item, context)
    if (isMiniLayout(context) && item.location.player !== getViewedPlayer(context)) {
      const scale = getCurrentMiniScale(context.rules.players.length)
      transform.push(`scale(${scale})`)
    }
    return transform
  }
}

export const adventureBoardLocator = new AdventureBoardLocator()
