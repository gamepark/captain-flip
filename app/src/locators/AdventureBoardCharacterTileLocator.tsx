import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { AdventureBoardCharacterTileDescription } from './descriptions/AdventureBoardCharacterTileDescription'

export class AdventureBoardCharacterTileLocator extends ItemLocator {
  parentItemType = MaterialType.AdventureBoard
  locationDescription = new AdventureBoardCharacterTileDescription()

  getParentItemId(location: Location) {
    return location.player
  }


  getPositionOnParent(location: Location) {
    const baseY = 86.9
    const baseX = 14.9
    return {
      x: baseX + 17.5 * location.x!,
      y: baseY - 17.2 * location.y!,
    }
  }
}

export const adventureBoardCharacterTileLocator = new AdventureBoardCharacterTileLocator()