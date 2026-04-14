import { MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { getCharacter } from '../../GetCharacter'
import { BoardHelper } from '../../helper/BoardHelper'
import { RuleId } from '../../RuleId'
import { CoinRule } from '../CoinRule'

export class CarpenterEndOfGameRule extends CoinRule {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0]) {
      moves.push(this.startPlayerTurn(RuleId.LookoutEndOfGame, nextPlayer))
    } else {
      moves.push(this.startPlayerTurn(RuleId.CarpenterEndOfGame, nextPlayer))
    }
    return moves
  }

  getCoins() {
    let coins = 0
    const carpenters = this.carpenters
    for (const carpenter of carpenters) {
      coins += this.getCarpenterCoin(carpenter)
    }

    return coins
  }

  getCarpenterCoin(carpenter: MaterialItem) {
    const gunners = this.gunners
    if (gunners.some((item) => item.location.x === carpenter.location.x || item.location.y === carpenter.location.y)) {
      return 0
    }

    // Check uncovered bomb symbols on board
    const helper = new BoardHelper(this.game)
    for (const place of helper.places) {
      if (!place.effect?.bomb) continue
      const occupied = this.material(MaterialType.CharacterTile)
        .location(LocationType.AdventureBoardCharacterTile)
        .player(this.player)
        .filter((item) => item.location.x === place.x && item.location.y === place.y)
        .length > 0
      if (!occupied && (place.x === carpenter.location.x || place.y === carpenter.location.y)) {
        return 0
      }
    }

    return 3
  }

  get carpenters() {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) =>  getCharacter(item) === Character.Carpenter)
      .getItems()
  }

  get gunners() {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) =>  getCharacter(item) === Character.Gunner)
      .getItems()
  }
}