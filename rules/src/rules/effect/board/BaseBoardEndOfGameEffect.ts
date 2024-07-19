import { BoardSpaceEffect } from '../../../material/board/description/BoardCommon'
import { BoardHelper } from '../../helper/BoardHelper'
import { Memory } from '../../Memory'
import { CoinRule } from '../CoinRule'
import { MaterialMove } from '@gamepark/rules-api'

export type EffectMemory<E extends BoardSpaceEffect = BoardSpaceEffect> = {
  effect: E,
  x: number,
  y: number
}

export abstract class BaseBoardEndOfGameEffect<E extends BoardSpaceEffect = BoardSpaceEffect> extends CoinRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    moves.push(this.goNext())
    return moves
  }

  removeFirst() {
    const effects = this.remind<EffectMemory[]>(Memory.BoardEndOfGameEffect)
    effects.shift()
    this.memorize(Memory.BoardEndOfGameEffect, effects)
  }

  goNext() {

    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0]) {
      const effects = this.remind<EffectMemory[]>(Memory.BoardEndOfGameEffect).slice(1)
      if (!effects.length) return this.endGame()
      const rule = new BoardHelper(this.game).getEffectRule(effects[0]!.effect)!
      return this.startPlayerTurn(rule, nextPlayer)
    } else {
      const effects = this.remind<EffectMemory[]>(Memory.BoardEndOfGameEffect)
      if (!effects.length) return this.endGame()
      const rule = new BoardHelper(this.game).getEffectRule(effects[0]!.effect)!
      return this.startPlayerTurn(rule, nextPlayer)
    }
  }

  get effect(): EffectMemory<E> {
    return this.remind<EffectMemory[]>(Memory.BoardEndOfGameEffect)[0]
  }

  onRuleEnd() {
    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0]) {
      this.removeFirst()
    }
    return []
  }
}