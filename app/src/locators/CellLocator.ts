import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { isPlayerVisible } from './ViewHelper'

class CellLocator extends Locator {
  parentItemType = MaterialType.AdventureBoard

  getParentItem(location: Location, context: MaterialContext) {
    return context.rules.material(MaterialType.AdventureBoard).player(location.player).getItem()
  }

  getPositionOnParent(location: Location) {
    const positions = [
      { x: 14, y: 84 },
      { x: 71.5, y: 24.5 }
    ]
    return positions[location.x ?? 0]
  }

  getRotateZ(location: Location) {
    if (location.x === 1) return 24
    return -25
  }

  getHoverTransform(item: MaterialItem, _context: ItemContext) {
    const sign = item.location.rotation ? 1 : -1
    return [`rotateZ(${sign * this.getRotateZ(item.location)}deg)`]
  }

  ignore(item: MaterialItem, context: ItemContext): boolean {
    return !isPlayerVisible(item, context)
  }
}

export const cellLocator = new CellLocator()
