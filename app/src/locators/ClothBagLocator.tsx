/** @jsxImportSource @emotion/react */
import { ItemLocator, LocationContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { ClothBagDescription } from './descriptions/ClothBagDescription'

export class ClothBagLocator extends ItemLocator {
  limit = 100
  locationDescription = new ClothBagDescription()
  getPosition(item :MaterialItem, context: LocationContext) {
    return {
      ...this.locationDescription.getCoordinates(item.location, context),
      z: 0.05
    }
  }
}

export const clothBagLocator = new ClothBagLocator();