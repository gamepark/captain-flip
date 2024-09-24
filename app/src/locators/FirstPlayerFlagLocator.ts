import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { FirstPlayerFlagDescription } from './descriptions/FirstPlayerFlagDescription'

export class FirstPlayerFlagLocator extends Locator {
  parentItemType = MaterialType.AdventureBoard
  locationDescription = new FirstPlayerFlagDescription()

  positionOnParent = {
    x: 7.87,
    y: 10.12
  }
}

export const firstPlayerFlagLocator = new FirstPlayerFlagLocator()