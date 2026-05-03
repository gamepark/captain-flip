import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CoinRule } from '@gamepark/captain-flip/rules/effect/CoinRule'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { MaterialGame } from '@gamepark/rules-api'

/** Instantiate a concrete rule class (Cook, Gunner, BoardEffectCoinX, ...)
 *  from the current game state and call `getCoins()` to obtain the expected
 *  coin delta the rule will apply.
 *
 *  ⚠️ When a log is rendered for a `StartRule(X)` move, the framework's
 *  `context.game` reflects the state BEFORE the move is applied — so
 *  `game.rule` still points at the PREVIOUS rule and its player. Rules
 *  that compute `getCoins()` from `this.player` (which is a getter on
 *  `game.rule.player`) will use the wrong player unless we override it.
 *
 *  If `playerId` is provided, we clone the game and force `game.rule`
 *  to a fake rule entry pointing at that player, so the rule's
 *  `this.player` resolves to the intended target. */
export const getRuleCoins = <T extends CoinRule>(
  game: MaterialGame,
  RuleClass: new (game: MaterialGame) => T,
  playerId?: number
): number => {
  let effectiveGame = game
  if (playerId !== undefined) {
    effectiveGame = {
      ...game,
      rule: { ...(game as any).rule, player: playerId }
    } as MaterialGame
  }
  const rule = new RuleClass(effectiveGame)
  return rule.getCoins() ?? 0
}

/** Current round number — incremented by EndOfTurnRule when the
 *  last player of a round just finished. Tile-counting heuristics
 *  don't work because Parrot/Monkey can place several tiles per turn. */
export const getRound = (game: MaterialGame): number => {
  return new CaptainFlipRules(game).remind<number>(Memory.Round) ?? 1
}
