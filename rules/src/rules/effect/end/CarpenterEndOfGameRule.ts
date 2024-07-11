import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { RuleId } from '../../RuleId'

export class CarpenterEndOfGameRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(this.startRule(RuleId.LookoutEndOfGame))
    return moves
  }
}