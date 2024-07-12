import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { PlayerId } from '../../../PlayerId'
import { getCharacter } from '../../GetCharacter'
import { RuleId } from '../../RuleId'
import uniqBy from 'lodash/uniqBy'

export class SwabbyEndOfGameRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []

    for (const player of this.game.players) {
      const coins = this.getCoins(player)
      if (coins) {
        moves.push(
          this.material(MaterialType.Coin).createItem({
            location: {
              type: LocationType.PlayerCoin,
              player: player
            },
            quantity: coins
          })
        )
      }

    }
    moves.push(this.startRule(RuleId.CarpenterEndOfGame))
    return moves
  }

  getCoins(player: PlayerId) {
    const swabby = uniqBy(this.getPlayerSwabby(player), (item) => item.location.x)?.length ?? 0

    if (!swabby) return 0
    return [1, 4, 9, 16, 25][swabby - 1]
  }

  getPlayerSwabby(playerId: PlayerId) {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
      .filter((item) =>  getCharacter(item) === Character.Swabby)
      .getItems()
  }
}