import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { ItemContext, ListLocator, MaterialContext, isItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { isPlayerVisible } from './ViewHelper'

class PlayerTreasureMapLocator extends ListLocator {
  parentItemType = MaterialType.AdventureBoard
  gap = { x: 5 }

  getParentItem(location: Location, { rules }: ItemContext) {
    return rules.material(MaterialType.AdventureBoard).player(location.player).getItem()!
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
        return  { x: 25, y: 2.5 }
    }
  }

  getRotateZ(location: Location): number {
    return  (location.rotation ?? 0) * 90
  }

  hide(item: MaterialItem, context: ItemContext): boolean {
    return !isPlayerVisible(item, context)
  }
}

export const playerTreasureMapLocator = new PlayerTreasureMapLocator()
