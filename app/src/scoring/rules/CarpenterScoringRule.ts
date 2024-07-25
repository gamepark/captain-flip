import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { CarpenterEndOfGameRule } from '@gamepark/captain-flip/rules/effect/end/CarpenterEndOfGameRule'
import { MaterialGame } from '@gamepark/rules-api'

export class CarpenterScoringRule extends CarpenterEndOfGameRule {

  constructor(game: MaterialGame, readonly playerId: PlayerId) {
    super(game)
  }

  get player() {
    return this.playerId
  }
}