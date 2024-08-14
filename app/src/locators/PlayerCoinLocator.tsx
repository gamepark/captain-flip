/** @jsxImportSource @emotion/react */
import { Coin } from '@gamepark/captain-flip/material/Coin'
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerCoinDescription } from './descriptions/PlayerCoinDescription'


export class PlayerCoinLocator extends PileLocator {
  limit = 100
  locationDescription = new PlayerCoinDescription()
  radius = 1.5

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = { ...this.locationDescription.getCoordinates(item.location, context) }

    if (item.id === Coin.Coin10) coordinates.z = 0.5
    if (item.id === Coin.Coin5) coordinates.z = 1
    if (item.id === Coin.Coin3) coordinates.z = 1.5
    if (item.id === Coin.Coin1) coordinates.z = 2

    return coordinates
  }

  getItemIndex(item: MaterialItem, { displayIndex }: ItemContext): number {
    return (item.id - 1) * 10 + displayIndex
  }
}

export const playerCoinLocator = new PlayerCoinLocator()