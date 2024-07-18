/** @jsxImportSource @emotion/react */
import { Coin } from '@gamepark/captain-flip/material/Coin'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerCoinDescription } from './descriptions/PlayerCoinDescription'


export class PlayerCoinLocator extends PileLocator {
  locationDescription = new PlayerCoinDescription()
  radius = 1.5

  transformItemLocation(item: MaterialItem, context: ItemContext): string[] {
    const { rules, locators } = context
    const board = rules.material(MaterialType.AdventureBoard).player(item.location.player)
    const boardItem = board.getItem()!
    return [
      locators[boardItem.location.type]!.getTranslate3d(boardItem, { ...context, type: MaterialType.AdventureBoard, index: board.getIndex()!, displayIndex: 0 }),
      ...super.transformItemLocation(item, context)
    ]
  }

  getCoordinates(item: MaterialItem) {
    const coordinates = { ...this.locationDescription.getCoordinates() }

    if (item.id === Coin.Coin10) coordinates.z = 0.5
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