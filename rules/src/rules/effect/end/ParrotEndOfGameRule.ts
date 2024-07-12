import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { PlayerId } from '../../../PlayerId'
import { getCharacter } from '../../GetCharacter'
import { RuleId } from '../../RuleId'

export class ParrotEndOfGameRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []

    for (const player of this.game.players) {
      const parrots = this.getPlayerParrot(player).length
      const coins = this.getPlayerCoins(player)
      if (coins) {
        moves.push(
          this.material(MaterialType.Coin).player(player).deleteItem(parrots)
        )
      }
    }

    moves.push(this.startRule(RuleId.SwabbyEndOfGame))
    return moves
  }

  getPlayerCoins(playerId: PlayerId) {
    const item = this
      .material(MaterialType.Coin)
      .player(playerId)
      .getItem()

    if (!item) return 0
    return item.quantity ?? 1

  }

  getCoins() {
    return -1
  }

  getPlayerParrot(playerId: PlayerId) {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
      .filter((item) =>  getCharacter(item) === Character.Parrot)
  }
}