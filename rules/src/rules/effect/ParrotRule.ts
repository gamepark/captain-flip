import { PlayerTurnRule } from '@gamepark/rules-api'
import { BoardHelper } from '../helper/BoardHelper'
import { RuleId } from '../RuleId'

export class ParrotRule extends PlayerTurnRule {
  onRuleStart() {
    if (this.isBoardFull) {
      return [
        this.startRule(RuleId.BoardEffect)
      ]
    }
    
    return [
      this.startRule(RuleId.DrawCharacterTile)
    ]
  }

  get isBoardFull() {
    const helper = new BoardHelper(this.game)
    let fullColumn = 0
    for (let x = 0; x < helper.columnCount; x++) {
      if (helper.isColumnFull(this.player, x)) fullColumn++
    }

    return fullColumn === helper.columnCount
  }
}