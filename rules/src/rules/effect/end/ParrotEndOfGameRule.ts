import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { RuleId } from '../../RuleId'

export class ParrotEndOfGameRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(this.startRule(RuleId.SwabbyEndOfGame))
    return moves
  }
}