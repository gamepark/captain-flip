import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class TreasureMapLocator extends Locator {
  getCoordinates(_: Location, { rules: { players } }: MaterialContext) {
    return players.length === 5 || players.length === 3 ? { y: 14 } : { y: -1 }

  }
}

export const treasureMapLocator = new TreasureMapLocator()