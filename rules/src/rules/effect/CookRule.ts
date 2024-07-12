import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class CookRule extends PlayerTurnRule {
  onRuleStart() {
    return [
      this.material(MaterialType.Coin).createItem({
        location: {
          type: LocationType.PlayerCoin,
          player: this.player
        },
        quantity: this.countColumnCharacters
      }),
      this.startRule(RuleId.BoardEffect)
    ]
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
    return this.material(MaterialType.CharacterTile)
      .getItem(this.remind(Memory.PlacedCard)[0])!
  }
}