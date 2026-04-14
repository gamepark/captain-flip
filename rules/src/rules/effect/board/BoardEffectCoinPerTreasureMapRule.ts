import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinPerTreasureMap = { type: BoardSpaceType, value: number }

export class BoardEffectCoinPerTreasureMapRule extends BaseBoardEffect<BoardEffectCoinPerTreasureMap> {
  getCoins() {
    const treasureMapCount = this.material(MaterialType.TreasureMapToken)
      .location(LocationType.PlayerTreasureMapToken)
      .player(this.player)
      .length
    return treasureMapCount * this.effect.effect.value
  }
}
