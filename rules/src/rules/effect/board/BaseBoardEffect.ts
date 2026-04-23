import { MaterialMove, RuleMove } from '@gamepark/rules-api'
import { BoardSpaceEffect } from '../../../material/board/description/BoardCommon'
import { Memory } from '../../Memory'
import { RuleId } from '../../RuleId'
import { CoinRule } from '../CoinRule'

export type EffectMemory<E extends BoardSpaceEffect = BoardSpaceEffect> = {
  effect: E,
  x: number,
  y: number,
  immediate?: boolean
}

export class BaseBoardEffect<E extends BoardSpaceEffect = BoardSpaceEffect> extends CoinRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    moves.push(this.goNext())
    return moves
  }

  removeFirst() {
    const effects = this.remind<EffectMemory[]>(Memory.BoardEffect)
    effects.shift()
    this.memorize(Memory.BoardEffect, effects)
  }

  goNext() {
    return this.startRule(RuleId.BoardEffect)
  }

  get effect(): EffectMemory<E> {
    return this.remind<EffectMemory[]>(Memory.BoardEffect)[0]
  }

  onRuleEnd(_move: RuleMove) {
    this.removeFirst()
    return []
  }
}