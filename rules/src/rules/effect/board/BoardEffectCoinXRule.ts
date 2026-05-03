import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinX = { type: BoardSpaceType, value: number }

export class BoardEffectCoinXRule extends BaseBoardEffect<BoardEffectCoinX> {
  getCoins() {
    return this.effect.effect.value
  }
}
