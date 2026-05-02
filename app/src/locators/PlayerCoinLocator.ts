import { Coin } from '@gamepark/captain-flip/material/Coin'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getCurrentMiniScale } from '../panels/PanelPosition'
import { adventureBoardLocator } from './AdventureBoardLocator'
import { PlayerCoinDescription } from './descriptions/PlayerCoinDescription'
import { getViewedPlayer, isMiniLayout } from './ViewHelper'

class PlayerCoinLocator extends PileLocator {
  locationDescription = new PlayerCoinDescription()

  getLocations(context: MaterialContext) {
    return context.rules.players.map(player => ({ type: LocationType.PlayerCoin, player }))
  }

  radius = 1.5

  /** Per-player board scale: 1 for viewed (and 2p), mini scale otherwise. */
  private boardScaleFor(location: Location, context: MaterialContext): number {
    if (!isMiniLayout(context)) return 1
    return location.player === getViewedPlayer(context) ? 1 : getCurrentMiniScale(context.rules.players.length)
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = adventureBoardLocator.getCoordinates(location, context)
    const scale = this.boardScaleFor(location, context)
    return { x: x + 9 * scale, y: y - 10 * scale }
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

  placeItem(item: MaterialItem, context: ItemContext) {
    const transform = super.placeItem(item, context)
    const scale = this.boardScaleFor(item.location, context)
    if (scale !== 1) transform.push(`scale(${scale})`)
    return transform
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerCoinLocator = new PlayerCoinLocator()
