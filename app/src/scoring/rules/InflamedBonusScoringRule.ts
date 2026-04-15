import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { TreasureMapHelper } from '@gamepark/captain-flip/rules/helper/TreasureMapHelper'
import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'

/** End-of-game bonus granted by the Inflamed (Burned) treasure map:
 *  +5 coins to the player currently holding it. Matches the
 *  `ParrotEndOfGameRule` backend implementation which adds these
 *  5 coins on top of the Parrot scoring — we expose it here as a
 *  distinct scoring source so the breakdown and result dialog can
 *  show it as its own line. */
export class InflamedBonusScoringRule extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly playerId: PlayerId) {
    super(game)
  }

  getCoins() {
    return new TreasureMapHelper(this.game, this.playerId).hasInflamedMap() ? 5 : 0
  }
}
