import { MaterialMove } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { getCharacter } from '../../GetCharacter'
import { RuleId } from '../../RuleId'
import { CoinRule } from '../CoinRule'

export class SwabbyEndOfGameRule extends CoinRule {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0]) {
      moves.push(this.startPlayerTurn(RuleId.CarpenterEndOfGame, nextPlayer))
    } else {
      moves.push(this.startPlayerTurn(RuleId.SwabbyEndOfGame, nextPlayer))
    }

    return moves
  }

  getCoins() {
    const swabby = uniqBy(this.swabbies, (item) => item.location.x)?.length ?? 0

    if (!swabby) return 0
    return [1, 4, 9, 16, 25][swabby - 1]
  }

  get swabbies() {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) => getCharacter(item) === Character.Swabby)
      .getItems()
  }
}