import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game/dist/locators/ItemLocator'
import { Location } from '@gamepark/rules-api'

export class PlayerTreasureMapLocator extends ItemLocator {
  parentItemType = MaterialType.AdventureBoard

  getParentItemId(location: Location){
    return location.player
  }

  positionOnParent = {
    x: 10,
    y: 10
  }

}

export const playerTreasureMapLocator = new PlayerTreasureMapLocator()