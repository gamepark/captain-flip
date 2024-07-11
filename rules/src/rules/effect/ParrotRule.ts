import { PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'

export class ParrotRule extends PlayerTurnRule {
  onRuleStart() {
    return [
      this.startRule(RuleId.DrawCharacterTile)
    ]
  }
}