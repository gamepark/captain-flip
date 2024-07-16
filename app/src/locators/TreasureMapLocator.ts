import { ItemLocator, LocationContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class TreasureMapLocator extends ItemLocator {
  position = { x: 0, y: -2, z: 0.05 }
  getPosition(_item: MaterialItem, context: LocationContext) {
    if (context.rules.players.length === 5 || context.rules.players.length === 3) {
      return { x: 0, y: 5, z: 0.05 }
    }

    return this.position
  }
}

export const treasureMapLocator = new TreasureMapLocator()