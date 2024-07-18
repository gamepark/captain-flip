/** @jsxImportSource @emotion/react */
import { Coin } from '@gamepark/captain-flip/material/Coin'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'


export class PlayerCoinLocator extends PileLocator {
  parentItemType = MaterialType.AdventureBoard
  radius = 1.5

  getParentItem(location: Location, context: ItemContext) {
    return context.rules.material(MaterialType.AdventureBoard).player(location.player).getItem()!
  }

  getPositionOnParent() {
    return {
      x: 87,
      y: 10
    }
  }


  getCoordinates(item: MaterialItem) {
    const coordinates = { x: 0, y: 0, z: 0.05 }

    if (item.id === Coin.Coin5) coordinates.z = 1
    if (item.id === Coin.Coin3) coordinates.z = 1.5
    if (item.id === Coin.Coin1) coordinates.z = 2

    return coordinates
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}_${item.id}`
  }
}

export const playerCoinLocator = new PlayerCoinLocator()