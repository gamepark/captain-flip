import { MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { PlayerId } from '../../../PlayerId'
import { getCharacter } from '../../GetCharacter'
import { RuleId } from '../../RuleId'

export class CarpenterEndOfGameRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []

    for (const player of this.game.players) {
      let coins = 0
      const carpenters = this.getPlayerCarpenter(player)
      for (const carpenter of carpenters) {
        coins += this.getCoins(player, carpenter)
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

    moves.push(this.startRule(RuleId.LookoutEndOfGame))
    return moves
  }

  getCoins(player: PlayerId, carpenter: MaterialItem) {
    const gunners = this.getPlayerGunner(player)
    if (!gunners.filter((item) => item.location.x === carpenter.location.x || item.location.y === carpenter.location.y).length) {
      return 3
    }

    return 0
  }

  getPlayerCarpenter(playerId: PlayerId) {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
      .filter((item) =>  getCharacter(item) === Character.Carpenter)
      .getItems()
  }

  getPlayerGunner(playerId: PlayerId) {
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
      .filter((item) =>  getCharacter(item) === Character.Gunner)
      .getItems()
  }
}