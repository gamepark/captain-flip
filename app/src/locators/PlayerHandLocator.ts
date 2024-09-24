/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, HandLocator } from '@gamepark/react-game'
import { MaterialContext } from '@gamepark/react-game/dist/locators/Locator'
import { Location } from '@gamepark/rules-api'
import { adventureBoardLocator } from './AdventureBoardLocator'

class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = adventureBoardLocator.getCoordinates(location, context)
    const index = getRelativePlayerIndex(context, location.player)
    const players = context.rules.players.length
    if ((players === 5 && index === 2) || (players === 3 && index === 1)) {
      return { x, y: y + 15, z: 5 }
    } else {
      return { x: x < 0 ? x + 15 : x - 15, y: players === 2 ? y - 0.7 : y, z: 5 }
    }
  }
}

export const playerHandLocator = new PlayerHandLocator()