import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CustomMoveType } from '@gamepark/captain-flip/material/CustomMoveType'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { BoardEffectCoinAndTreasureMapRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinAndTreasureMapRule'
import { BoardEffectStealLeftRule, BoardEffectStealRightRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectStealRule'
import { BoardEffectCoinPerBombRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerBombRule'
import { BoardEffectCoinPerDifferentAdjacentRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerDifferentAdjacentRule'
import { BoardEffectCoinPerDifferentRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerDifferentRule'
import { BoardEffectCoinPerFullColumnRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerFullColumnRule'
import { BoardEffectCoinPerTreasureMapRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerTreasureMapRule'
import { BoardEffectCoinXRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinXRule'
import { BoardEffectPassTreasureMapRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectPassTreasureMapRule'
import { BoardEffectXIfRowSameRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectXIfRowSameRule'
import { BoardEffectFirstFlipThenYRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectFirstFlipThenYRule'
import { BoardEffectFirstXThenYRowRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectFirstXThenYRowRule'
import { BoardEffectFirstXThenYRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectFirstXThenYRule'
import { BoardEndOfGameCoinIfAllDifferentRule } from '@gamepark/captain-flip/rules/effect/board/BoardEndOfGameCoinIfAllDifferentRule'
import { BoardEndOfGameCoinIfSameRule } from '@gamepark/captain-flip/rules/effect/board/BoardEndOfGameCoinIfSameRule'
import { CoinRule } from '@gamepark/captain-flip/rules/effect/CoinRule'
import { CookRule } from '@gamepark/captain-flip/rules/effect/CookRule'
import { GunnerRule } from '@gamepark/captain-flip/rules/effect/GunnerRule'
import { MonkeyRule } from '@gamepark/captain-flip/rules/effect/MonkeyRule'
import { NavigatorRule } from '@gamepark/captain-flip/rules/effect/NavigatorRule'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import {
  isCustomMoveType,
  isEndGame,
  isMoveItemType,
  isStartPlayerTurn,
  isStartRule,
  MaterialGame,
  MaterialMove
} from '@gamepark/rules-api'
import { ComponentType, FC } from 'react'
import { CoinGainLog } from './components/CoinGainLog'
import { DrawOrFlipTileLog } from './components/DrawOrFlipTileLog'
import { EndOfTurnLog, shouldShowEndOfTurnLog } from './components/EndOfTurnLog'
import { FlipOnBoardLog } from './components/FlipOnBoardLog'
import { PassMapLeftLog } from './components/PassMapLeftLog'
import { PassMapRightLog } from './components/PassMapRightLog'
import { PassMapSwapLog } from './components/PassMapSwapLog'
import { PlaceTileLog } from './components/PlaceTileLog'
import { PlayerScoreBreakdownLog } from './components/PlayerScoreBreakdownLog'
import { RotateTreasureMapLog } from './components/RotateTreasureMapLog'
import { BonusBadge, BonusKind, getBonusKind, Props } from './shared'
import { StealLog } from './components/StealLog'
import { TakeTreasureMapLog } from './components/TakeTreasureMapLog'
import { TurnSeparatorLog } from './components/TurnSeparatorLog'
import { VictoryLog } from './components/VictoryLog'

/** Wrap a log Component with a "column / row bonus" badge prefix when
 *  the underlying board effect was queued because a column or row
 *  was completed. The badge is rendered inline before the original
 *  content so the dispatcher can keep its single-Component contract. */
const withBonusBadge = (Inner: ComponentType<Props>, kind: BonusKind): FC<Props> =>
  (props) => (
    <>
      <BonusBadge kind={kind}/>
      <Inner {...props}/>
    </>
  )
import {
  endOfGameHeaderCss,
  endTurnCardCss,
  playerEntryCss,
  scoreEntryCss,
  separatorCss,
  victoryCss
} from './logStyles'

/* ==================================================================
 * CaptainFlipLogs — maps every game move to a log entry.
 *
 * Guiding principles:
 *   - A StartRule is ONLY logged if it produces a coin gain/loss
 *     (via its `getCoins()` method). Its sole purpose is to show
 *     the amount gained. Every other visual side-effect is logged
 *     through its own MoveItem move — not through the StartRule.
 *   - Visual tile actions (placement, flip in hand, flip on board,
 *     play from cell, take map) are logged by the MoveItem events.
 *   - System transitions (StartPlayerTurn, EndGame) become italic
 *     separators and victory card respectively.
 *
 * All sub-effects are rendered at depth 1. Only player-owned turn
 * actions (place, draw, flip, end of turn, scores, victory) are
 * depth 0.
 * ================================================================== */
export class CaptainFlipLogs implements LogDescription<MaterialMove> {
  getMovePlayedLogDescription(
    move: MaterialMove,
    context: MoveComponentContext<MaterialMove>
  ): MovePlayedLogDescription | undefined {
    // Helper: every depth-1 entry is tinted with the colour of the
    // player currently acting. We pull it from `context.action.playerId`
    // or, for moves that carry it explicitly, from `move.player`.
    const depthPlayerId = (move as any).player ?? context.action.playerId
    const depthTint = playerEntryCss(context.game, depthPlayerId)

    /* ---------- System transitions ---------- */
    if (isStartPlayerTurn(move)) {
      if (move.id === RuleId.DrawCharacterTile) {
        return { Component: TurnSeparatorLog, depth: 0, css: separatorCss }
      }
      // End-of-game scoring chain fires 4 StartPlayerTurn moves per
      // player (Swabby → Carpenter → Lookout → Parrot). Instead of
      // emitting 4 lines per player, we emit ONE synthetic breakdown
      // line on the Swabby start (first scoring rule) and silence
      // the others — the breakdown component reads all scoring
      // sources at once via the dedicated scoring helpers.
      if (move.id === RuleId.SwabbyEndOfGame) {
        const targetPlayer = (move as any).player
        // The first scoring move of the chain fires for players[0].
        // We tag it with a "=== End of game ===" separator via CSS
        // so the journal gets a clear visual break before the
        // per-player breakdowns.
        const isFirstScore = targetPlayer === context.game.players[0]
        return {
          Component: PlayerScoreBreakdownLog,
          player: targetPlayer,
          depth: 0,
          css: [
            scoreEntryCss,
            playerEntryCss(context.game, targetPlayer),
            isFirstScore && endOfGameHeaderCss
          ]
        }
      }
      if (move.id === RuleId.CarpenterEndOfGame) return undefined
      if (move.id === RuleId.LookoutEndOfGame) return undefined
      if (move.id === RuleId.ParrotEndOfGame) return undefined
      if (move.id === RuleId.InflamedEndOfGame) return undefined
      return undefined
    }

    if (isEndGame(move)) {
      return { Component: VictoryLog, depth: 0, css: victoryCss }
    }

    /* ---------- Start rule markers ---------- */
    if (isStartRule(move)) {
      const id = move.id

      // End of turn → depth-0 highlighted card (drives coin + gambler/kraken).
      // Silenced entirely when the player has no treasure-map related
      // bonus to show (no base coins, no Kraken, no Gambler trigger),
      // otherwise we'd emit an empty "End of turn" ribbon with no body.
      if (id === RuleId.EndOfTurn) {
        const playerId = (move as any).player ?? context.action.playerId
        if (!shouldShowEndOfTurnLog(context.game, playerId)) return undefined
        return { Component: EndOfTurnLog, depth: 0, css: endTurnCardCss }
      }

      // 2 players: BoardEffectPassTreasureMap resolves itself without any
      // player choice, so the StartRule is the only place left to narrate
      // the swap (the resulting token moves are silenced below).
      if (id === RuleId.BoardEffectPassTreasureMap) {
        const rule = new BoardEffectPassTreasureMapRule(context.game)
        if (!rule.isAutomaticSwap || rule.getPassMoves(1).length === 0) return undefined
        const kind = getBonusKind(context.game, move)
        const Component = kind ? withBonusBadge(PassMapSwapLog, kind) : PassMapSwapLog
        return { Component, depth: 1, css: depthTint }
      }

      // Every StartRule that maps to a CoinRule is logged ONLY if it
      // produces coins. Steal rules go through the same gate — this is
      // the only place where we silence them when the victim is broke
      // or has no matching characters. Visual-only effects (Flip,
      // FlipCell, …) are absent from the map and fall through to
      // `return undefined`.
      const RuleClass = coinRuleForId[id as RuleId]
      if (!RuleClass) return undefined
      const rule = new RuleClass(context.game)
      const coins = rule.getCoins?.() ?? 0
      if (coins === 0) return undefined
      const kind = getBonusKind(context.game, move)
      // Steal effects get a narrative line ("X steals N from Y"); the
      // rest goes through the generic gain/loss line.
      const isSteal = id === RuleId.BoardEffectStealLeft || id === RuleId.BoardEffectStealRight
      const Inner = isSteal ? StealLog : CoinGainLog
      const Component = kind ? withBonusBadge(Inner, kind) : Inner
      return { Component, depth: 1, css: depthTint }
    }

    /* ---------- Custom moves (pass treasure map direction) ---------- */
    if (isCustomMoveType(CustomMoveType.PassPrevious)(move)) {
      const kind = getBonusKind(context.game, move)
      const Component = kind ? withBonusBadge(PassMapLeftLog, kind) : PassMapLeftLog
      return { Component, depth: 1, css: depthTint }
    }
    if (isCustomMoveType(CustomMoveType.PassNext)(move)) {
      const kind = getBonusKind(context.game, move)
      const Component = kind ? withBonusBadge(PassMapRightLog, kind) : PassMapRightLog
      return { Component, depth: 1, css: depthTint }
    }

    /* ---------- Item moves ---------- */
    if (isMoveItemType(MaterialType.CharacterTile)(move)) {
      // A MoveItem(CharacterTile) whose destination is AdventureBoardCharacterTile
      // is ambiguous: it can be either:
      //   - a real placement (PlayerHand / Cell → AdventureBoard)
      //   - an on-board flip (AdventureBoard → AdventureBoard with a
      //     different rotation) emitted by Monkey, BoardEffectFlip, etc.
      // We inspect the pre-move state via .material().getItem() on the
      // source to know where the tile was before.
      if (move.location.type === LocationType.AdventureBoardCharacterTile) {
        const rules = new CaptainFlipRules(context.game)
        const sourceLocationType = rules
          .material(MaterialType.CharacterTile)
          .getItem(move.itemIndex)
          ?.location.type
        if (sourceLocationType === LocationType.AdventureBoardCharacterTile) {
          // Same board → different rotation = flip on board. Tag the
          // line with a column/row badge when the flip comes from a
          // board-effect rule processing a deferred entry.
          const flipKind = getBonusKind(context.game, move)
          const Component = flipKind ? withBonusBadge(FlipOnBoardLog, flipKind) : FlipOnBoardLog
          return { Component, depth: 1, css: depthTint }
        }
        // Hand or Cell → Board = real placement
        return {
          Component: PlaceTileLog,
          player: move.location.player,
          depth: 0,
          css: playerEntryCss(context.game, move.location.player)
        }
      }
      // Hand → Hand = draw OR flip in hand — the component dispatches
      // on context.consequenceIndex to render the right variant.
      if (move.location.type === LocationType.PlayerHand) {
        return {
          Component: DrawOrFlipTileLog,
          player: move.location.player,
          depth: 0,
          css: playerEntryCss(context.game, move.location.player)
        }
      }
      // Board → Cell, Cell → Cell = flip inside a cell. Rendered the
      // same way as an on-board flip (just the tile's new face).
      if (move.location.type === LocationType.Cell) {
        return { Component: FlipOnBoardLog, depth: 1, css: depthTint }
      }
      return undefined
    }

    if (isMoveItemType(MaterialType.TreasureMapToken)(move)) {
      // Any move landing on PlayerTreasureMapToken = the player picks
      // up (or receives) a treasure map. Logged directly, which lets
      // us drop the redundant Cartographer / BoardEffectTreasureMap
      // start-rule entries.
      if (move.location.type === LocationType.PlayerTreasureMapToken) {
        // Maps handed over by the PassTreasureMap effect are already
        // narrated by the pass / swap entry — don't add a "takes a
        // Treasure Map" line for each of them.
        if (context.game.rule?.id === RuleId.BoardEffectPassTreasureMap) return undefined
        // AllDirections rotation: source AND destination are the same
        // player's PlayerTreasureMapToken slot — only the rotation
        // changes. Render a dedicated "rotates one notch" log instead
        // of the take-map line.
        const rules = new CaptainFlipRules(context.game)
        const sourceLocation = rules.material(MaterialType.TreasureMapToken).getItem(move.itemIndex)?.location
        if (
          sourceLocation?.type === LocationType.PlayerTreasureMapToken
          && sourceLocation.player === move.location.player
        ) {
          return {
            Component: RotateTreasureMapLog,
            player: move.location.player,
            depth: 0,
            css: playerEntryCss(context.game, move.location.player)
          }
        }
        const mapKind = getBonusKind(context.game, move)
        if (mapKind) {
          // Column / row bonus context → render as a sub-effect of the
          // placement (depth 1, no avatar) to match the other badged logs.
          return { Component: withBonusBadge(TakeTreasureMapLog, mapKind), depth: 1, css: depthTint }
        }
        return {
          Component: TakeTreasureMapLog,
          player: move.location.player,
          depth: 0,
          css: playerEntryCss(context.game, move.location.player)
        }
      }
      return undefined
    }

    // Low-level Coin moves are silenced — they're the raw material
    // events behind the aggregated CoinGainLog.
    return undefined
  }
}

/* Mapping from a RuleId to the concrete CoinRule class. Used to
 * determine at dispatch time whether a StartRule produces coins.
 * Only rules that actually implement `getCoins()` are listed — the
 * purely visual effects (BoardEffectFlip, BoardEffectFlipCell,
 * BoardEffectPlayFromCell, BoardEffectPassTreasureMap, ...) are
 * intentionally absent so they're silenced by the `!RuleClass` check. */
const coinRuleForId: Partial<Record<RuleId, new (game: MaterialGame) => CoinRule>> = {
  [RuleId.Cook]: CookRule,
  [RuleId.Gunner]: GunnerRule,
  [RuleId.Navigator]: NavigatorRule,
  [RuleId.Monkey]: MonkeyRule,
  [RuleId.BoardEffectCoinX]: BoardEffectCoinXRule,
  [RuleId.BoardEffectFirstXThenY]: BoardEffectFirstXThenYRule,
  [RuleId.BoardEffectFirstXThenYRow]: BoardEffectFirstXThenYRowRule,
  [RuleId.BoardEffectFirstFlipThenY]: BoardEffectFirstFlipThenYRule,
  [RuleId.BoardEffectCoinPerDifferent]: BoardEffectCoinPerDifferentRule,
  [RuleId.BoardEffectCoinPerDifferentAdjacent]: BoardEffectCoinPerDifferentAdjacentRule,
  [RuleId.BoardEffectCoinPerFullColumn]: BoardEffectCoinPerFullColumnRule,
  [RuleId.BoardEffectCoinPerTreasureMap]: BoardEffectCoinPerTreasureMapRule,
  [RuleId.BoardEffectCoinPerBomb]: BoardEffectCoinPerBombRule,
  [RuleId.BoardEffectCoinAndTreasureMap]: BoardEffectCoinAndTreasureMapRule,
  [RuleId.BoardEndOfGameCoinIfSame]: BoardEndOfGameCoinIfSameRule,
  [RuleId.BoardEndOfGameCoinIfAllDifferent]: BoardEndOfGameCoinIfAllDifferentRule,
  [RuleId.BoardEffectXIfRowSame]: BoardEffectXIfRowSameRule,
  [RuleId.BoardEffectStealLeft]: BoardEffectStealLeftRule,
  [RuleId.BoardEffectStealRight]: BoardEffectStealRightRule,
}
