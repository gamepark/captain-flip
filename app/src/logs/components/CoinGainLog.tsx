/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { BoardSpaceEffect } from '@gamepark/captain-flip/material/board/description/BoardCommon'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { BoardEffectCoinAndTreasureMapRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinAndTreasureMapRule'
import { BoardEffectCoinPerBombRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerBombRule'
import { BoardEffectCoinPerDifferentAdjacentRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerDifferentAdjacentRule'
import { BoardEffectCoinPerDifferentRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerDifferentRule'
import { BoardEffectCoinPerFullColumnRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerFullColumnRule'
import { BoardEffectCoinPerTreasureMapRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinPerTreasureMapRule'
import { BoardEffectCoinXRule } from '@gamepark/captain-flip/rules/effect/board/BoardEffectCoinXRule'
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
import { getCharacter } from '@gamepark/captain-flip/rules/GetCharacter'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { isStartRule, MaterialGame } from '@gamepark/rules-api'
import { FC, ReactElement } from 'react'
import { Trans } from 'react-i18next'
import { EffectIcon } from '../../effects/effectIcon'
import { CharacterTileMini, ClickableLine, commonComponents, Props, useName } from '../shared'
import { useOpenItemHelp } from '../useOpenItemHelp'

/* Single log component for every StartRule that produces a coin
 * delta. The amount and sign are computed by instantiating the rule
 * class on `context.game` and reading `getCoins()`. An identifying
 * icon is appended at the end of the line:
 *   - For a board-effect rule → the effect image (via getEffectImage)
 *   - For a character-effect rule → the mini tile of the placed
 *     character that triggered it (Cook, Gunner, Monkey, Navigator)
 */
export const CoinGainLog: FC<Props> = ({ move, context }) => {
  const openHelp = useOpenItemHelp()
  if (!isStartRule(move)) return null
  const RuleClass = coinRuleForId[move.id as RuleId]
  const playerId = (move as any).player ?? context.action.playerId
  const name = useName(playerId)
  if (!RuleClass) return null
  // Play the StartRule move on a deep clone of context.game so that
  // `onRuleEnd` of the previous rule (which shifts Memory.BoardEffect)
  // and `onRuleStart` of this rule have already run. Reading
  // `Memory.BoardEffect[0]` from the resulting game then yields the
  // effect actually being executed — not the previous one still sitting
  // at the head of the queue because the framework captures the log
  // context BEFORE applying the move.
  const clonedGame = JSON.parse(JSON.stringify(context.game))
  const rules = new CaptainFlipRules(clonedGame)
  rules.play(move)
  const rule = new RuleClass(rules.game)
  const delta = rule.getCoins?.() ?? 0
  if (delta === 0) return null
  const coins = Math.abs(delta)
  const i18nKey = delta > 0 ? 'log.coins.gain' : 'log.coins.loss'

  // Character-effect rules (Cook, Gunner, Monkey, Navigator) → the
  // trailing icon is a tile the player just placed, so we make the
  // whole line clickable to open that tile's help modal. Board-effect
  // rules don't have a clickable material underneath and stay inert.
  const ruleId = move.id as RuleId
  const isCharacterRule = characterForRule[ruleId] !== undefined || ruleId === RuleId.Navigator
  let trailing: ReactElement | undefined
  let onClick: (() => void) | undefined
  if (isCharacterRule) {
    const placedIndex = rules.remind<number>(Memory.PlacedCard)
    const placedItem = placedIndex !== undefined
      ? rules.material(MaterialType.CharacterTile).getItem(placedIndex)
      : undefined
    const character = placedItem ? getCharacter(placedItem) : undefined
    if (character !== undefined) {
      trailing = <CharacterTileMini character={character}/>
    }
    onClick = openHelp(MaterialType.CharacterTile, placedItem, placedIndex)
  } else {
    // Board-effect icon — not clickable.
    const effectMemory = (rule as any).effect as { effect: BoardSpaceEffect } | undefined
    const effect = effectMemory?.effect
    const board = rules.remind<BoardType>(Memory.Board)
    if (effect && board !== undefined) {
      trailing = <EffectIcon board={board} effect={effect}/>
    }
  }

  const content = (
    <Trans
      i18nKey={i18nKey}
      values={{ player: name, coins }}
      components={{
        ...commonComponents,
        icon: trailing ?? <span/>
      }}
    />
  )
  return onClick ? <ClickableLine onClick={onClick}>{content}</ClickableLine> : content
}

/** Character-effect RuleIds — these are the rule starts whose trailing
 *  tile in the log is the placed character tile (so the whole line
 *  becomes clickable to open that tile's material help modal).
 *  Navigator is treated as one as well because even though it isn't
 *  literally "the character placed", its trigger is the most recent
 *  Cartographer placement, which lives at Memory.PlacedCard. */
const characterForRule: Partial<Record<RuleId, true>> = {
  [RuleId.Cook]: true,
  [RuleId.Gunner]: true,
  [RuleId.Monkey]: true,
}

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
}
