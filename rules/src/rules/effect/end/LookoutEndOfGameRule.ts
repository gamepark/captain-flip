import { MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { PlayerId } from '../../../PlayerId'
import { getCharacter } from '../../GetCharacter'
import { RuleId } from '../../RuleId'

export class LookoutEndOfGameRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      let coins = 0
      const lookouts = this.getPlayerLookouts(player)
      for (const lookout of lookouts) {
        coins += this.getCoin(player, lookout)
      }

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

    moves.push(this.startRule(RuleId.BoardEndOfEffect))
    return moves
  }

  getCoin(playerId: PlayerId, lookout: MaterialItem) {
    const characters = this.getPlayerCharacters(playerId)
    if (!characters.some((item) => item.location.x === lookout.location.x && item.location.y! > lookout.location.y!)) {
      return 4
    }

    return 0
  }

  getPlayerLookouts(playerId: PlayerId) {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
      .filter((item) =>  getCharacter(item) === Character.Lookout)
      .getItems()
  }

  getPlayerCharacters(playerId: PlayerId) {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
      .getItems()
  }
}