import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Character } from '../../material/tiles/Character'
import { getCharacter } from '../GetCharacter'
import { RuleId } from '../RuleId'

export class NavigatorRule extends PlayerTurnRule {
  onRuleStart() {
    const cartographers = this.cartographerCount
    const moves: MaterialMove[] = []
    if (cartographers > 0) {
      moves.push(
        this.material(MaterialType.Coin).createItem({
          location: {
            type: LocationType.PlayerCoin,
            player: this.player
          },
          quantity: cartographers * 2
        })
      )
    }

    moves.push(this.startRule(RuleId.BoardEffect))
    return moves
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