import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { LookoutEndOfGameRule } from '@gamepark/captain-flip/rules/effect/end/LookoutEndOfGameRule'
import { MaterialGame } from '@gamepark/rules-api'

export class LookoutScoringRule extends LookoutEndOfGameRule {

  constructor(game: MaterialGame, readonly playerId: PlayerId) {
    super(game)
  }

  get player() {
    return this.playerId
  }
}