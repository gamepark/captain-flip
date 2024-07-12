import { MaterialRulesPart } from '@gamepark/rules-api'
import { BoardSpaceEffect } from '../../../material/board/description/BoardCommon'
import { BoardHelper } from '../../helper/BoardHelper'
import { Memory } from '../../Memory'

export type EffectMemory<E extends BoardSpaceEffect = BoardSpaceEffect> = {
  effect: E,
  x: number,
  y: number
}

export class BaseBoardEndOfGameEffect<E extends BoardSpaceEffect = BoardSpaceEffect> extends MaterialRulesPart {

  removeFirst() {
    const effects = this.remind<EffectMemory[]>(Memory.BoardEndOfGameEffect)
    effects.shift()
    this.memorize(Memory.BoardEndOfGameEffect, effects)
  }

  goNext() {
    this.removeFirst()
    const effects = this.remind<EffectMemory[]>(Memory.BoardEndOfGameEffect)
    if (!effects.length) return this.endGame()
    const rule = new BoardHelper(this.game).getEffectRule(effects[0]!.effect)!
    return this.startRule(rule)
  }

  get effect(): EffectMemory<E> {
    return this.remind<EffectMemory[]>(Memory.BoardEndOfGameEffect)[0]
  }
}