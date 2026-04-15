import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { TreasureMapType } from '../../../material/TreasureMapType'
import { TreasureMapHelper } from '../../helper/TreasureMapHelper'
import { RuleId } from '../../RuleId'
import { CoinRule } from '../CoinRule'

/** End-of-game bonus for the Inflamed (Burned) treasure map:
 *  +5 coins to whoever holds it when the game ends. Plays after
 *  ParrotEndOfGame and before the board end-of-game effects.
 *
 *  If no player holds the Burned map (or the map is not in the
 *  current game at all), the whole phase is bypassed: the first
 *  invocation jumps straight to BoardEndOfEffect without iterating
 *  over any player. */
export class InflamedEndOfGameRule extends CoinRule {
  onRuleStart(): MaterialMove[] {
    // Bypass the whole phase when the Inflamed map isn't held by
    // any player — no point iterating through every player for a
    // bonus nobody can claim.
    if (!this.isInflamedHeld()) {
      return [this.startRule(RuleId.BoardEndOfEffect)]
    }

    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())

    const nextPlayer = this.nextPlayer
    if (nextPlayer === this.game.players[0]) {
      moves.push(this.startRule(RuleId.BoardEndOfEffect))
    } else {
      moves.push(this.startPlayerTurn(RuleId.InflamedEndOfGame, nextPlayer))
    }
    return moves
  }

  getCoins() {
    return new TreasureMapHelper(this.game, this.player).hasInflamedMap() ? 5 : 0
  }

  private isInflamedHeld(): boolean {
    return this.material(MaterialType.TreasureMapToken)
      .location(LocationType.PlayerTreasureMapToken)
      .filter((item) => item.id === TreasureMapType.Inflamed)
      .length > 0
  }
}
