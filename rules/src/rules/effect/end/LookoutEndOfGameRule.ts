import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'

export class LookoutEndOfGameRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(this.endGame())
    return moves
  }
}