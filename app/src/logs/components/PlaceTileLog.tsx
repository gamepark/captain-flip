/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { BoardSpaceType } from '@gamepark/captain-flip/material/board/description/BoardSpaceType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { getCharacter } from '@gamepark/captain-flip/rules/GetCharacter'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { tileChipCss, whoCss } from '../logStyles'
import { CharacterTileMini, ClickableLine, commonComponents, Props, useName } from '../shared'
import { useOpenItemHelp } from '../useOpenItemHelp'

/* Tile placement log: "<player> places <tile> at column N, row M".
 *
 * If the destination space is a "Cost" space (Board D), we append a
 * "(-N coins)" suffix via a distinct translation key so the player
 * sees they've paid for the placement. The actual coin removal is
 * a low-level Coin move that we silence, so this inline mention is
 * the only trace of the cost in the journal.
 *
 * To read the final character face, we apply the move on a cloned
 * game via `new CaptainFlipRules(clone).play(move)` — this gives
 * us the post-move state with the correct rotation, so
 * `getCharacter(item)` resolves to exactly what's shown on the
 * board. The whole line is wrapped in ClickableLine so clicking
 * anywhere opens the help modal. */
export const PlaceTileLog: FC<Props> = ({ move, context }) => {
  const player = (move as any).location?.player ?? context.action.playerId
  const name = useName(player)
  const rules = new CaptainFlipRules(structuredClone(context.game))
  rules.play(move)
  const itemIndex = (move as any).itemIndex
  const item = rules.material(MaterialType.CharacterTile).getItem(itemIndex)
  const character = item ? getCharacter(item) : undefined
  const x = (move as any).location?.x
  const y = (move as any).location?.y
  const column = x !== undefined ? x + 1 : '?'
  const row = y !== undefined ? y + 1 : '?'
  // Detect Cost space on the pre-move state — we use the raw
  // context.game (not the cloned one) so BoardHelper sees the board
  // type currently in play.
  const placeEffect = (x !== undefined && y !== undefined)
    ? new BoardHelper(context.game).getPlaceEffect({ x, y })
    : undefined
  const cost = placeEffect?.type === BoardSpaceType.Cost ? (placeEffect as any).cost as number : 0
  const onClick = useOpenItemHelp()(MaterialType.CharacterTile, item, itemIndex)
  const i18nKey = cost > 0 ? 'log.place.with-cost' : 'log.place'
  return (
    <ClickableLine onClick={onClick}>
      <Trans
        i18nKey={i18nKey}
        values={{ player: name, column, row, cost }}
        components={{
          ...commonComponents,
          who: <span css={whoCss}/>,
          tile: character !== undefined
            ? <CharacterTileMini character={character}/>
            : <span css={tileChipCss}/>
        }}
      />
    </ClickableLine>
  )
}
