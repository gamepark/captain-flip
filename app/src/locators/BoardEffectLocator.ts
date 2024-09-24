import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

// This locator is only used for tutorial. If we had time to spend, we could imagine displaying help on each board effect
class BoardEffectLocator extends Locator {
  parentItemType = MaterialType.AdventureBoard
  locationDescription = new LocationDescription({ height: 14.5, width: 4.5, borderRadius: 0.4 })

  positionOnParent = {
    x: 85,
    y: 66
  }
}

export const boardEffectLocator = new BoardEffectLocator()