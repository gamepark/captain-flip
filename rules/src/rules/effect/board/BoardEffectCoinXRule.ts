import { MaterialMove } from '@gamepark/rules-api'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinX = { type: BoardSpaceType, value: number }

export class BoardEffectCoinXRule extends BaseBoardEffect<BoardEffectCoinX> {
  onRuleStart() {
    const effect = this.effect.effect
    const moves: MaterialMove[] = []
    moves.push(
      this.material(MaterialType.Coin).createItem({
        location: {
          type: LocationType.PlayerCoin,
          player: this.player
        },
        quantity: effect.value
      })
    )

    moves.push(this.goNext())
    return moves
  }
}