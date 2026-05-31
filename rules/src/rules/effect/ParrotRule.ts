import { PlayerTurnRule } from '@gamepark/rules-api'
import { BoardHelper } from '../helper/BoardHelper'
import { RuleId } from '../RuleId'

export class ParrotRule extends PlayerTurnRule {
  onRuleStart() {
    if (new BoardHelper(this.game).isBoardFull(this.player)) {
      return [
        this.startRule(RuleId.BoardEffect)
      ]
    }

    return [
      this.startRule(RuleId.DrawCharacterTile)
    ]
  }
}