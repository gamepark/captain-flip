/** @jsxImportSource @emotion/react */
import { Coin } from '@gamepark/captain-flip/material/Coin'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { adventureBoardLocator } from './AdventureBoardLocator'
import { PlayerCoinDescription } from './descriptions/PlayerCoinDescription'

class PlayerCoinLocator extends PileLocator {
  locationDescription = new PlayerCoinDescription()

  getLocations(context: MaterialContext) {
    return context.rules.players.map(player => ({
      type: LocationType.PlayerCoin,
      player
    }))
  }

  radius = 1.5

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = adventureBoardLocator.getCoordinates(location, context)
    return { x: x + 9, y: y - 10 }
  }

  getLocationCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = this.getCoordinates(location, context)
    return { x, y, z: 5 }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y, z = 0 } = super.getItemCoordinates(item, context)
    switch (item.id) {
      case Coin.Coin10:
        return { x, y, z: z + 0.5 }
      case Coin.Coin5:
        return { x, y, z: z + 1 }
      case Coin.Coin3:
        return { x, y, z: z + 1.5 }
      case Coin.Coin1:
      default:
        return { x, y, z: z + 2 }
    }
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerCoinLocator = new PlayerCoinLocator()