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
      this.customMove(CustomMoveType.PassPrevious),
      this.customMove(CustomMoveType.PassNext)
    ]
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.PassPrevious)(move) || isCustomMoveType(CustomMoveType.PassNext)(move)) {
      // Turn-order semantics, independent of screen layout: PassNext hands
      // maps to the next player (myIndex + 1), PassPrevious to the previous
      // player (myIndex - 1). Which on-screen button triggers which is a
      // front-end concern (see PassDirectionButtons).
      const direction = isCustomMoveType(CustomMoveType.PassNext)(move) ? 1 : -1
      const moves: MaterialMove[] = []
      const players = this.game.players

      // Capture refs BEFORE mutating locations — otherwise subsequent
      // queries would pick up maps that just moved. Same pattern as
      // the "passing cards" guidance in CLAUDE.md.
      const byPlayer = players.map((player) => ({
        player,
        neighbor: players[(players.indexOf(player) + direction + players.length) % players.length],
        maps: this.material(MaterialType.TreasureMapToken)
          .location(LocationType.PlayerTreasureMapToken)
          .player(player)
      }))

      for (const { maps, neighbor } of byPlayer) {
        if (maps.length === 0) continue
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
