import { PlayerTurnRule } from '@gamepark/rules-api'
import { EffectMemory } from './effect/board/BaseBoardEffect'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BoardEffectRule extends PlayerTurnRule {
  onRuleStart() {
    const helper = new BoardHelper(this.game)
    const effects = this.effects

    if (effects.length && effects[0]!.immediate) {
      const rule = helper.getEffectRule(effects[0]!.effect)
      if (rule) return [this.startRule(rule)]
      this.removeFirst()
      return [this.startRule(RuleId.BoardEffect)]
    }

    const pendingCharacter = this.remind<RuleId | undefined>(Memory.PendingCharacterEffect)
    if (pendingCharacter !== undefined) {
      this.forget(Memory.PendingCharacterEffect)
      return [this.startRule(pendingCharacter)]
    }

    if (effects.length) {
      const rule = helper.getEffectRule(effects[0]!.effect)
      if (rule) return [this.startRule(rule)]
      this.removeFirst()
      return [this.startRule(RuleId.BoardEffect)]
    }

    return [this.startRule(RuleId.EndOfTurn)]
  }

  get effects() {
    return this.remind<EffectMemory[]>(Memory.BoardEffect) ?? []
  }

  removeFirst() {
    const effects = this.effects
    effects.shift()
    this.memorize(Memory.BoardEffect, effects)
  }
}
