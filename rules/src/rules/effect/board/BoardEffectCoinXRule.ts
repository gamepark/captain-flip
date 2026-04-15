import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinX = { type: BoardSpaceType, value: number }

export class BoardEffectCoinXRule extends BaseBoardEffect<BoardEffectCoinX> {
  getCoins() {
    const effect = this.effect.effect
    console.log(effect, effect.value)
    return effect.value
  }
}
