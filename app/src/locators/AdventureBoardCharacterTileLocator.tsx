import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { ItemContext, ItemLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { AdventureBoardCharacterTileDescription } from './descriptions/AdventureBoardCharacterTileDescription'

export class AdventureBoardCharacterTileLocator extends ItemLocator {
  parentItemType = MaterialType.AdventureBoard
  locationDescription = new AdventureBoardCharacterTileDescription()

  getParentItemId(location: Location) {
    return location.player
  }

  getParentItem(location: Location, context: ItemContext) {
    return context.rules.material(MaterialType.AdventureBoard).player(location.player).getItem()!
  }

  getPositionOnParent(location: Location, context: MaterialContext) {
    const board = context.rules.remind(Memory.Board)
    const baseY = board === BoardType.BoardB? 86.0 :86.9
    const baseX = 14.9
    return {
      x: baseX + 17.5 * location.x!,
      y: baseY - 17.2 * location.y!,
    }
  }
}

export const adventureBoardCharacterTileLocator = new AdventureBoardCharacterTileLocator()