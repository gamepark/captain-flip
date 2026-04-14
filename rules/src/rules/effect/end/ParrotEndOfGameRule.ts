import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { getCharacter } from '../../GetCharacter'
import { TreasureMapHelper } from '../../helper/TreasureMapHelper'
import { RuleId } from '../../RuleId'
import { CoinRule } from '../CoinRule'

export class ParrotEndOfGameRule extends CoinRule {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())

    // Inflamed map: +5 coins at end of game
    const mapHelper = new TreasureMapHelper(this.game, this.player)
    if (mapHelper.hasInflamedMap()) {
      moves.push(...this.gainCoinsMoves(5))
    }

    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0]) {
      moves.push(this.startRule(RuleId.BoardEndOfEffect))
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