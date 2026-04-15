import { ItemMove, MaterialMove } from '@gamepark/rules-api'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { TreasureMapPickHelper } from '../../helper/TreasureMapPickHelper'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinAndTreasureMap = { type: BoardSpaceType, value: number }

export class BoardEffectCoinAndTreasureMapRule extends BaseBoardEffect<BoardEffectCoinAndTreasureMap> {
  onRuleStart() {
    const moves: MaterialMove[] = []
    // Inline the coin gain — we skip BaseBoardEffect's super call
    // because it would append goNext() eagerly, and we need to
    // control the treasure-map pick flow ourselves.
    moves.push(...this.gainCoinsMoves(this.getCoins()))

    const pickMoves = new TreasureMapPickHelper(this.game, this.player).getPickMoves()
    if (pickMoves.length === 0) {
      // No map to take → just the coins + next
      moves.push(this.goNext())
      return moves
    }
    // 1 pick → auto-play, 2+ picks → wait for getPlayerMoves.
    // Either way, `afterItemMove` below handles the goNext() call
    // once the pick move lands.
    moves.push(...pickMoves)
    return moves
  }

  getPlayerMoves() {
    return new TreasureMapPickHelper(this.game, this.player).getPickMoves()
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (TreasureMapPickHelper.isPickMove(move)) {
      return [this.goNext()]
    }
    return []
  }

  getCoins() {
    return this.effect.effect.value
  }
}
