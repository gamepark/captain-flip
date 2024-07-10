/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { characterTileDescription } from '../material/CharacterTileDescription'

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

class AdventureBoardCharacterTileDescription extends LocationDescription {
  height = characterTileDescription.height
  width = characterTileDescription.width
  borderRadius = 0.4

}

export const adventureBoardCharacterTileLocator = new AdventureBoardCharacterTileLocator()