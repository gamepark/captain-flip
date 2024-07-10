/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { ClothBagDescription } from './descriptions/ClothBagDescription'

export class ClothBagLocator extends PileLocator {
  limit = 100
  locationDescription = new ClothBagDescription()
  coordinates = { x: 0, y: 17, z: 0.05 };
}

export const clothBagLocator = new ClothBagLocator();