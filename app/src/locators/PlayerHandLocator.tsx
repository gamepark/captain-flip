/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { PlayerHandDescription } from './descriptions/PlayerHandDescription'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new PlayerHandDescription()
  getCoordinates(location: Location, context: ItemContext) {
    return this.locationDescription.getHandPosition(location, context)
  }
}

export const playerHandLocator = new PlayerHandLocator()