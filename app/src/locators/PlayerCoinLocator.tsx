/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { adventureBoardLocation } from './AdventureBoardLocator'


export class PlayerCoinLocator extends PileLocator {
  radius = 1.5


  getCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = adventureBoardLocation.getBoardPosition(item.location.player!, context)


    const index = getRelativePlayerIndex(context, item.location.player!)
    if (context.rules.players.length === 2) {
      coordinates.x += (index === 0? 10: -10)
      coordinates.y -= 14.1
    } else if (context.rules.players.length === 5 && index === 2) {
      coordinates.x += 14.1
      coordinates.y += 10
    } else {
      coordinates.x += coordinates.x < 0? 14.1: -14.1
      coordinates.y -= 10
    }

    return coordinates
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}_${item.id}`
  }
}

export const playerCoinLocator = new PlayerCoinLocator()