import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '../../../material/CustomMoveType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BaseBoardEffect } from './BaseBoardEffect'

export class BoardEffectPassTreasureMapRule extends BaseBoardEffect {
  onRuleStart() {
    return []
  }

  getPlayerMoves() {
    return [
      this.customMove(CustomMoveType.PassLeft),
      this.customMove(CustomMoveType.PassRight)
    ]
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.PassLeft)(move) || isCustomMoveType(CustomMoveType.PassRight)(move)) {
      const direction = isCustomMoveType(CustomMoveType.PassLeft)(move) ? -1 : 1
      const moves: MaterialMove[] = []
      const players = this.game.players

      for (const player of players) {
        const maps = this.material(MaterialType.TreasureMapToken)
          .location(LocationType.PlayerTreasureMapToken)
          .player(player)
        if (maps.length === 0) continue

        const playerIndex = players.indexOf(player)
        const neighborIndex = (playerIndex + direction + players.length) % players.length
        const neighbor = players[neighborIndex]

        moves.push(...maps.moveItems({
          type: LocationType.PlayerTreasureMapToken,
          player: neighbor
        }))
      }

      moves.push(this.goNext())
      return moves
    }
    return []
  }
}
