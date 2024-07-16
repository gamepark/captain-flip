/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ItemContext, ItemLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class AdventureBoardLocator extends ItemLocator {
  getPosition(item: MaterialItem, context: ItemContext) {
    return this.getBoardPosition(item.location.player!, context)
  }

  getBoardPosition(player: number, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, player)
    switch (index) {
      case 0:
        if (context.rules.players.length === 2) return{ x: -19, y: 13, z: 0.05}
        return { x: -35, y: 13, z: 0.05}
      case 1:
        if (context.rules.players.length === 2) return { x: 19, y: 13, z: 0.05}
        return { x: -35, y: -13, z: 0.05}
      case 2:
        if (context.rules.players.length === 5) return  { x: 0, y: -13, z: 0.05}
        return { x: 35, y: -13, z: 0.05}
      case 3:
        if (context.rules.players.length === 5) return { x: 35, y: -13, z: 0.05}
        return { x: 35, y: 13, z: 0.05}
      case 4:
      default:
        return { x: 35, y: 13, z: 0.05}
    }
  }
}

export const adventureBoardLocation = new AdventureBoardLocator()