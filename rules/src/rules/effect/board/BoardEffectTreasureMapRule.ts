import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { BaseBoardEffect } from './BaseBoardEffect'

export class BoardEffectTreasureMapRule extends BaseBoardEffect {
  onRuleStart() {
    const token = this.treasureMapToken
    const moves: MaterialMove[] = []
    if (token.getItem()?.location.player !== this.player) {
      moves.push(
        this.material(MaterialType.TreasureMapToken).moveItem({
          type: LocationType.PlayerTreasureMapToken,
          player: this.player
        })
      )
    }

    moves.push(this.goNext())
    return moves
  }

  get treasureMapToken() {
    return this.material(MaterialType.TreasureMapToken)
  }
}