import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { AdventureBoardCharacterTileDescription } from './descriptions/AdventureBoardCharacterTileDescription'

class AdventureBoardCharacterTileLocator extends Locator {
  parentItemType = MaterialType.AdventureBoard
  locationDescription = new AdventureBoardCharacterTileDescription()

  getParentItem(location: Location, context: MaterialContext) {
    return context.rules.material(MaterialType.AdventureBoard).player(location.player).getItem()
  }

  getPositionOnParent(location: Location, context: MaterialContext) {
    const baseY = 86.9 + this.getDeltaY(context)
    const baseX = 14.9
    return {
      x: baseX + 17.5 * location.x!,
      y: baseY - 17.2 * location.y!
    }
  }

  getDeltaY(context: MaterialContext) {
    const board = context.rules.remind(Memory.Board)
    switch (board) {
      case BoardType.BoardB:
        return -0.9
      case BoardType.BoardE:
        return -2.9
      default:
        return 0
    }
  }

  getHoverTransform(item: MaterialItem) {
    return [`translateZ(${item.location.rotation ? -10 : 10}em)`, 'scale(2)']
  }
}

export const adventureBoardCharacterTileLocator = new AdventureBoardCharacterTileLocator()