import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { isPlayerVisible } from './ViewHelper'

class PlayerTreasureMapLocator extends ListLocator {
  parentItemType = MaterialType.AdventureBoard
  gap = { x: 5 }

  getParentItem(location: Location, { rules }: ItemContext) {
    return rules.material(MaterialType.AdventureBoard).player(location.player).getItem()!
  }

  getPositionOnParent(location: Location, context: MaterialContext) {
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

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (!isPlayerVisible(item, context)) return [...transforms, 'scale(0.001)']
    return transforms
  }
}

export const playerTreasureMapLocator = new PlayerTreasureMapLocator()
