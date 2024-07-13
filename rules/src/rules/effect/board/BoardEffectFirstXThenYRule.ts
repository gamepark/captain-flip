import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectFirstXThenY = { type: BoardSpaceType, first: number, then: number }

export class BoardEffectFirstXThenYRule extends BaseBoardEffect<BoardEffectFirstXThenY> {
  getCoins() {
    const effect = this.effect.effect
    const triggerCount = this.countPlayerThatTriggerThisOne()
    return triggerCount === 1? effect.first: effect.then
  }

  countPlayerThatTriggerThisOne() {
    const effect = this.effect
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .filter((item) => effect.x === item.location.x && effect.y === item.location.y)
      .length
  }
}