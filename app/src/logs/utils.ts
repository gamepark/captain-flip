import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { CoinRule } from '@gamepark/captain-flip/rules/effect/CoinRule'
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

/** Estimate the current round number from the number of placed
 *  character tiles divided by the number of players. */
export const getRound = (game: any): number => {
  const placed = game.items[MaterialType.CharacterTile]?.filter(
    (i: any) => i.location?.type === LocationType.AdventureBoardCharacterTile
  ).length ?? 0
  const players = game.players?.length ?? 1
  return Math.floor(placed / players) + 1
}

export const hasTreasureMapType = (game: any, playerId: number, type: number): boolean => {
  const tokens = game.items[MaterialType.TreasureMapToken] ?? []
  return tokens.some(
    (t: any) =>
      t.location?.type === LocationType.PlayerTreasureMapToken &&
      t.location.player === playerId &&
      t.id === type
  )
}
