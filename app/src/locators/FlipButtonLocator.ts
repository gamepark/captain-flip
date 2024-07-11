import { ItemLocator } from '@gamepark/react-game'
import { FlipButtonDescription } from './descriptions/FlipButtonDescription'

export class FlipButtonLocator extends ItemLocator {
  locationDescription = new FlipButtonDescription()
}

export const monkeyFlipButtonLocator = new FlipButtonLocator()