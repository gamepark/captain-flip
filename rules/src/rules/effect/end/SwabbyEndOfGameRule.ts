import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { RuleId } from '../../RuleId'

export class SwabbyEndOfGameRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(this.startRule(RuleId.CarpenterEndOfGame))
    return moves
  }
}