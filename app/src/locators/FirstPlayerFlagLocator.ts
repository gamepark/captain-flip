import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { FirstPlayerFlagDescription } from './descriptions/FirstPlayerFlagDescription'

export class FirstPlayerFlagLocator extends Locator {
  parentItemType = MaterialType.AdventureBoard
  locationDescription = new FirstPlayerFlagDescription()

  positionOnParent = {
    x: 6.7,
    y: -4
  }
}

export const firstPlayerFlagLocator = new FirstPlayerFlagLocator()
