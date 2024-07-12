import { MaterialMove } from '@gamepark/rules-api'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BoardHelper } from '../../helper/BoardHelper'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinPerFullColumn = { type: BoardSpaceType, value: number }

export class BoardEffectCoinPerFullColumnRule extends BaseBoardEffect<BoardEffectCoinPerFullColumn> {

  onRuleStart() {
    const effect = this.effect.effect
    const moves: MaterialMove[] = []
    const helper = new BoardHelper(this.game)
    let fullColumn = 0
    for (let x = 0; x < helper.columnCount; x++) {
      if (helper.isColumnFull(this.player, x)) fullColumn++
    }

    moves.push(
      this.material(MaterialType.Coin).createItem({
        location: {
          type: LocationType.PlayerCoin,
          player: this.player
        },
        quantity: fullColumn * effect.value
      })
    )
    moves.push(this.goNext())
    return moves
  }
}