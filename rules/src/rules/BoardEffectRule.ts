import { PlayerTurnRule } from '@gamepark/rules-api'
import { BoardSpaceEffectWithCoordinates } from '../material/board/description/BoardCommon'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BoardEffectRule extends PlayerTurnRule {
  onRuleStart() {
    const helper = new BoardHelper(this.game)
    const effects = this.effects
    if (!effects.length) return [this.startRule(RuleId.EndOfTurn)]
    const rule = helper.getEffectRule(effects[0]!.effect)
    if (!rule) return [this.startRule(RuleId.EndOfTurn)]
    return [this.startRule(rule)]
  }

  get effects() {
    return this.remind<BoardSpaceEffectWithCoordinates[]>(Memory.BoardEffect) ?? []
  }
}