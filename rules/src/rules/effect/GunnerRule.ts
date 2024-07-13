import { RuleId } from '../RuleId'
import { CoinRule } from './CoinRule'

export class GunnerRule extends CoinRule {
  onRuleStart() {
    return [
      ...super.onRuleStart(),
      this.startRule(RuleId.BoardEffect)
    ]
  }

  getCoins(): number {
    return 5
  }
}