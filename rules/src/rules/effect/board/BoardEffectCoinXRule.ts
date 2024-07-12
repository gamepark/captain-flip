import { MaterialMove } from '@gamepark/rules-api'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { PlayerId } from '../../../PlayerId'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinX = { type: BoardSpaceType, value: number }

export class BoardEffectCoinXRule extends BaseBoardEffect<BoardEffectCoinX> {
  onRuleStart() {
    const effect = this.effect.effect
    const moves: MaterialMove[] = []

    if (effect.value > 0) {

      moves.push(
        this.material(MaterialType.Coin).createItem({
          location: {
            type: LocationType.PlayerCoin,
            player: this.player
          },
          quantity: effect.value
        })
      )
    } else {
      const coins = this.getPlayerCoins(this.player)
      if (coins >= effect.value) {
        moves.push(this.material(MaterialType.Coin).deleteItem(effect.value))
      }
    }

    moves.push(this.goNext())
    return moves
  }

  getPlayerCoins(playerId: PlayerId) {
    const item = this
      .material(MaterialType.Coin)
      .player(playerId)
      .getItem()

    if (!item) return 0
    return item.quantity ?? 1

  }
}