import { HandLocator, ItemContext } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { adventureBoardLocator } from './AdventureBoardLocator'
import { isPlayerVisible } from './ViewHelper'

class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = adventureBoardLocator.getCoordinates(location, context)
    return { x: x < 0 ? x + 15 : x - 15, y: y - 0.7, z: 5 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (!isPlayerVisible(item, context)) return [...transforms, 'scale(0.001)']
    return transforms
  }
}

export const playerHandLocator = new PlayerHandLocator()
