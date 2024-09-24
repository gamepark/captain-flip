/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class AdventureBoardLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    switch (index) {
      case 0:
        if (context.rules.players.length === 2) return { x: -19, y: 13 }
        if (context.rules.players.length === 3) return { x: -30, y: 8 }
        if (context.rules.players.length === 4) return { x: -24, y: 13 }
        return { x: -35, y: 13 }
      case 1:
        if (context.rules.players.length === 3) return { y: -10 }
        if (context.rules.players.length === 2) return { x: 19, y: 13 }
        if (context.rules.players.length === 4) return { x: -24, y: -13 }
        return { x: -35, y: -13 }
      case 2:
        if (context.rules.players.length === 3) return { x: 30, y: 8 }
        if (context.rules.players.length === 5) return { y: -13 }
        if (context.rules.players.length === 4) return { x: 24, y: -13 }
        return { x: 35, y: -13 }
      case 3:
        if (context.rules.players.length === 5) return { x: 35, y: -13 }
        if (context.rules.players.length === 4) return { x: 24, y: 13 }
        return { x: 35, y: 13 }
      case 4:
      default:
        return { x: 35, y: 13 }
    }
  }
}

export const adventureBoardLocator = new AdventureBoardLocator()