import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { SwabbyEndOfGameRule } from '@gamepark/captain-flip/rules/effect/end/SwabbyEndOfGameRule'
import { MaterialGame } from '@gamepark/rules-api'

export class SwabbyScoringRule extends SwabbyEndOfGameRule {

  constructor(game: MaterialGame, readonly playerId: PlayerId) {
    super(game)
  }

  get player() {
    return this.playerId
  }
}