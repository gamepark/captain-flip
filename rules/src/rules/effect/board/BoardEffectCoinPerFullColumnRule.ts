import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { BoardHelper } from '../../helper/BoardHelper'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinPerFullColumn = { type: BoardSpaceType, value: number }

export class BoardEffectCoinPerFullColumnRule extends BaseBoardEffect<BoardEffectCoinPerFullColumn> {
  getCoins() {
    const effect = this.effect.effect
    const helper = new BoardHelper(this.game)
    let fullColumn = 0
    for (let x = 0; x < helper.columnCount; x++) {
      if (helper.isColumnFull(this.player, x)) fullColumn++
    }
    return fullColumn * effect.value
  }

}