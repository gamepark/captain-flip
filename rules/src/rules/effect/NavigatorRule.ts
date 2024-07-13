import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Character } from '../../material/tiles/Character'
import { getCharacter } from '../GetCharacter'
import { RuleId } from '../RuleId'
import { CoinRule } from './CoinRule'

export class NavigatorRule extends CoinRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    moves.push(this.startRule(RuleId.BoardEffect))
    return moves
  }

  getCoins() {
    const cartographers = this.cartographerCount
    if (cartographers > 0) {
      return cartographers * 2
    }

    return 0
  }

  get cartographerCount() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) => getCharacter(item) === Character.Cartographer)
      .length
  }
}