import { ItemLocator, LocationContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class TreasureMapLocator extends ItemLocator {
  position = { x: -5, y: 0, z: 0.05 }
  getPosition(_item: MaterialItem, context: LocationContext) {
    if (context.rules.players.length === 5) {
      return { x: 0, y: 5, z: 0.05 }
    }

    return this.position
  }
}

export const treasureMapLocator = new TreasureMapLocator()