import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { getCharacter } from '../../GetCharacter'
import { RuleId } from '../../RuleId'
import { CoinRule } from '../CoinRule'

export class ParrotEndOfGameRule extends CoinRule {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())

    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0]) {
      // All players have been scored for parrots — hand over to the
      // Inflamed end-of-game phase. That rule knows how to bypass
      // itself entirely if no player holds the Burned treasure map.
      moves.push(this.startPlayerTurn(RuleId.InflamedEndOfGame, nextPlayer))
    } else {
      moves.push(this.startPlayerTurn(RuleId.ParrotEndOfGame, nextPlayer))
    }
    return moves
  }

  getCoins() {
    return this.parrots.length * this.getParrotCoins()
  }

  getParrotCoins() {
    return -1
  }

  get parrots() {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) =>  getCharacter(item) === Character.Parrot)
  }
}
