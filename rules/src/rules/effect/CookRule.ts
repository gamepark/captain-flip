import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { CoinRule } from './CoinRule'

export class CookRule extends CoinRule {
  onRuleStart() {
    return [
      ...super.onRuleStart(),
      this.startRule(RuleId.BoardEffect)
    ]
  }

  getCoins(): number {
    return this.countColumnCharacters
  }

  get countColumnCharacters() {
    const cook = this.cook
    return this.adventureBoardTile.filter((item) => item.location.y === cook.location.y).length
  }

  get adventureBoardTile() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
  }


  get cook() {
    return this.material(MaterialType.CharacterTile).getItem(this.remind(Memory.PlacedCard))!
  }
}