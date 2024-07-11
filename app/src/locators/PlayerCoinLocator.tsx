/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { adventureBoardLocation } from './AdventureBoardLocator'

export class PlayerCoinLocator extends LineLocator {
  delta = { y: 0.5 }

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = adventureBoardLocation.getBoardPosition(item.location.player!, context)
    coordinates.x += coordinates.x < 0? 13.5: -13.5
    coordinates.y -= 10.7
    return coordinates
  }
}

export const playerCoinLocator = new PlayerCoinLocator()