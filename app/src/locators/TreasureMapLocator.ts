import { ItemLocator } from '@gamepark/react-game/dist/locators/ItemLocator'

export class TreasureMapLocator extends ItemLocator {
  position = { x: -5, y: 0 }
}

export const treasureMapLocator = new TreasureMapLocator()