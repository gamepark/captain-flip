/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { adventureBoardLocation } from './AdventureBoardLocator'

export class PlayerCoinLocator extends PileLocator {
  radius = 2
  getCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = adventureBoardLocation.getBoardPosition(item.location.player!, context)
    coordinates.x += coordinates.x < 0? 13.5: -13.5
    coordinates.y -= 10.7
    return coordinates
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}_${item.id}`
  }
}

export const playerCoinLocator = new PlayerCoinLocator()