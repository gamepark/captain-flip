import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemContext, ItemLocator } from '@gamepark/react-game/dist/locators/ItemLocator'
import { Location } from '@gamepark/rules-api'

export class PlayerTreasureMapLocator extends ItemLocator {
  parentItemType = MaterialType.AdventureBoard

  getParentItem(location: Location, context: ItemContext) {
    return context.rules.material(MaterialType.AdventureBoard).player(location.player).getItem()!
  }

  positionOnParent = {
    x: 10,
    y: 10
  }

}

export const playerTreasureMapLocator = new PlayerTreasureMapLocator()