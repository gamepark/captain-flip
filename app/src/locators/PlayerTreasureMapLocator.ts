import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemContext, Locator } from '@gamepark/react-game/dist/locators/Locator'
import { Location } from '@gamepark/rules-api'

class PlayerTreasureMapLocator extends Locator {
  parentItemType = MaterialType.AdventureBoard

  getParentItem(location: Location, { rules }: ItemContext) {
    return rules.material(MaterialType.AdventureBoard).player(location.player).getItem()!
  }

  getPositionOnParent(location: Location, { rules: { players } }: ItemContext) {
    return location.player === players[0] ? { x: 28, y: 2 } : { x: 15, y: 2.5 }

  }
}

export const playerTreasureMapLocator = new PlayerTreasureMapLocator()