import { MaterialMove } from '@gamepark/rules-api'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinAndTreasureMap = { type: BoardSpaceType, value: number }

export class BoardEffectCoinAndTreasureMapRule extends BaseBoardEffect<BoardEffectCoinAndTreasureMap> {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    const token = this.material(MaterialType.TreasureMapToken)
    if (token.getItem()?.location.player !== this.player) {
      moves.push(
        token.moveItem({
          type: LocationType.PlayerTreasureMapToken,
          player: this.player
        })
      )
    }
    return moves
  }

  getCoins() {
    return this.effect.effect.value
  }
}
