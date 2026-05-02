import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { ItemContext, ListLocator, MaterialContext, isItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPanelTablePosition } from '../panels/PanelPosition'
import { isMiniLayout } from './ViewHelper'

class PlayerTreasureMapLocator extends ListLocator {
  parentItemType = MaterialType.AdventureBoard
  gap = { x: 5 }

  // 3+: detach from the parent board so maps land at an absolute
  // table position (right of the bag) instead of on the (mini) board.
  getParentItem(location: Location, context: ItemContext) {
    if (isMiniLayout(context)) return undefined as any
    const description = context.material[MaterialType.AdventureBoard]
    return description?.getStaticItems(context).find(item => item.location.player === location.player) as any
  }

  getCoordinates(_location: Location, context: MaterialContext) {
    if (isMiniLayout(context)) {
      // Right of the central board, above the coin pile.
      const { x: centralX } = getPanelTablePosition(1, context.rules.players.length)
      return { x: centralX + 14, y: 19, z: 5 }
    }
    return { x: 0, y: 0 }
  }

  getPositionOnParent(location: Location, context: MaterialContext) {
    if (!isItemContext(context)) return { x: 50, y: 50 }
    const board = (context.rules as any).remind(Memory.Board)
    switch (board) {
      case BoardType.BoardF:
        return { x: 36, y: 2 }
      case BoardType.BoardG:
        return { x: 46, y: 0 }
      case BoardType.BoardH:
        return location.x === 0 ? { x: 46, y: 0 } : { x: 41, y: 0 }
      case BoardType.BoardI:
        return { x: 32, y: 0 }
      default:
        return { x: 25, y: 2.5 }
    }
  }

  getRotateZ(location: Location): number {
    return (location.rotation ?? 0) * 90
  }
}

export const playerTreasureMapLocator = new PlayerTreasureMapLocator()
