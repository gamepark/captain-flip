/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, HandLocator, ItemContext, LocationContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { adventureBoardLocator } from './AdventureBoardLocator'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: ItemContext) {
    return this.getHandPosition(location, context)
  }

  getHandPosition(location: Location, context: LocationContext){
    const coordinates = adventureBoardLocator.getBoardPosition(location.player!, context)
    const index = getRelativePlayerIndex(context, location.player!)
    if (context.rules.players.length === 5 && index === 2) {
      coordinates.y += 15
      coordinates.z = 5
    } else if (context.rules.players.length === 3 && index === 1) {
      coordinates.y += 15
      coordinates.z = 5
    } else {
      coordinates.x += coordinates.x < 0? 15: -15
      coordinates.z = 5
    }

    if (context.rules.players.length === 2) {
      coordinates.y -= 0.7
    }

    return coordinates
  }
}

export const playerHandLocator = new PlayerHandLocator()