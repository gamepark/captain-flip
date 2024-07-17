import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FirstPlayerFlagDescription } from './descriptions/FirstPlayerFlagDescription'

export class FirstPlayerFlagLocator extends ItemLocator {
  parentItemType = MaterialType.AdventureBoard
  locationDescription = new FirstPlayerFlagDescription()

  getParentItemId(location: Location) {
    return location.player
  }

  positionOnParent = {
    x: 7.87,
    y: 10.12
  }
}

export const firstPlayerFlagLocator = new FirstPlayerFlagLocator()