import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'

// This locator is only used for tutorial. If we had time to spend, we could imagine displaying help on each board effect
export class BoardEffectLocator extends ItemLocator {
  parentItemType = MaterialType.AdventureBoard
  locationDescription = new BoardEffectDescription()

  positionOnParent = {
    x: 85,
    y: 66
  }
}

class BoardEffectDescription extends LocationDescription {
  height = 14.5
  width = 4.5
  borderRadius = 0.4
}

export const boardEffectLocator =  new BoardEffectLocator()