import { Locator } from '@gamepark/react-game'

class TreasureMapLocator extends Locator {
  coordinates = { y: -1 }
}

export const treasureMapLocator = new TreasureMapLocator()
