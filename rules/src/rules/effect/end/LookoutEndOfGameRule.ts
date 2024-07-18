import { MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { getCharacter } from '../../GetCharacter'
import { RuleId } from '../../RuleId'
import { CoinRule } from '../CoinRule'

export class LookoutEndOfGameRule extends CoinRule {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0]) {
      moves.push(this.startPlayerTurn(RuleId.ParrotEndOfGame, nextPlayer))
    } else {
      moves.push(this.startPlayerTurn(RuleId.LookoutEndOfGame, nextPlayer))
    }
    return moves
  }

  getCoins() {
    let coins = 0
    const lookouts = this.lookouts
    for (const lookout of lookouts) {
      coins += this.getLookoutCoins(lookout)
    }

    return coins
  }

  getLookoutCoins(lookout: MaterialItem) {
    const characters = this.characters
    if (!characters.some((item) => item.location.x === lookout.location.x && item.location.y! > lookout.location.y!)) {
      return 4
    }

    return 0
  }

  get lookouts() {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) =>  getCharacter(item) === Character.Lookout)
      .getItems()
  }

  get characters() {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .getItems()
  }
}