import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemContext, ItemLocator } from '@gamepark/react-game/dist/locators/ItemLocator'
import { Location } from '@gamepark/rules-api'

export class PlayerTreasureMapLocator extends ItemLocator {
  parentItemType = MaterialType.AdventureBoard

  getParentItem(location: Location, context: ItemContext) {
    return context.rules.material(MaterialType.AdventureBoard).player(location.player).getItem()!
  }

  getPositionOnParent(location: Location, context: ItemContext) {
    const first = context.rules.players[0]
    if (location.player === first) {
      return {
        x: 28,
        y: 2
      }
    }

    return this.positionOnParent
  }

  positionOnParent = {
    x: 15,
    y: 2.5
  }

}

export const playerTreasureMapLocator = new PlayerTreasureMapLocator()