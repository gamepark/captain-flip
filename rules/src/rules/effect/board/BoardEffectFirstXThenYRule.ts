import { MaterialMove } from '@gamepark/rules-api'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectFirstXThenY = { type: BoardSpaceType, first: number, then: number }

export class BoardEffectFirstXThenYRule extends BaseBoardEffect<BoardEffectFirstXThenY> {
  onRuleStart() {
    const effect = this.effect.effect
    const moves: MaterialMove[] = []
    const triggerCount = this.countPlayerThatTriggerThisOne()
    const coins = triggerCount === 1? effect.first: effect.then
    moves.push(
      this.material(MaterialType.Coin).createItem({
        location: {
          type: LocationType.PlayerCoin,
          player: this.player
        },
        quantity: coins
      })
    )

    moves.push(this.goNext())
    return moves
  }

  countPlayerThatTriggerThisOne() {
    const effect = this.effect
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .filter((item) => effect.x === item.location.x && effect.y === item.location.y)
      .length
  }
}