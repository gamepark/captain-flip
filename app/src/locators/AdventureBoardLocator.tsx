/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ItemContext, ItemLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class AdventureBoardLocator extends ItemLocator {
  getPosition(item: MaterialItem, context: ItemContext) {
    return this.getBoardPosition(item.id, context)
  }

  getBoardPosition(player: number, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, player)
    switch (index) {
      case 0:
        return { x: -35, y: 13, z: 0.05}
      case 1:
        return { x: -35, y: -13, z: 0.05}
      case 2:
        return { x: 35, y: -13, z: 0.05}
      case 3:
        return { x: 35, y: 13, z: 0.05}
      case 4:
      default:
        return { x: 0, y: 0, z: 0.05}
    }
  }
}

export const adventureBoardLocation = new AdventureBoardLocator()