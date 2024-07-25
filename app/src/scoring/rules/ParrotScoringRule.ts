import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { ParrotEndOfGameRule } from '@gamepark/captain-flip/rules/effect/end/ParrotEndOfGameRule'
import { MaterialGame } from '@gamepark/rules-api'

export class ParrotScoringRule extends ParrotEndOfGameRule {

  constructor(game: MaterialGame, readonly playerId: PlayerId) {
    super(game)
  }

  get player() {
    return this.playerId
  }
}