/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { getCharacter } from '@gamepark/captain-flip/rules/GetCharacter'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { CharacterTileMini, ClickableLine, commonComponents, Props, useName } from '../shared'
import { useOpenItemHelp } from '../useOpenItemHelp'

/* Flip of a tile already on the adventure board or in a cell.
 *
 * Emitted as a MoveItem(CharacterTile, Board→Board [same location]) by
 * Monkey, BoardEffectFlip, BoardEffectFirstFlipThenY, BoardEffectFlipCell,
 * etc. We read the BEFORE face from the raw pre-move state and the
 * AFTER face by replaying the move on a cloned game, so the log
 * renders "{before} → {after}". The whole line is wrapped in
 * ClickableLine so clicking anywhere opens the tile's help modal. */
export const FlipOnBoardLog: FC<Props> = ({ move, context }) => {
  const itemIndex = (move as any).itemIndex
  // Pre-flip face from the raw game state.
  const preItem = new CaptainFlipRules(context.game)
    .material(MaterialType.CharacterTile)
    .getItem(itemIndex)
  const charBefore = preItem ? getCharacter(preItem) : undefined
  // Post-flip face from a cloned game with the move applied.
  const rules = new CaptainFlipRules(structuredClone(context.game))
  rules.play(move)
  const postItem = rules.material(MaterialType.CharacterTile).getItem(itemIndex)
  const charAfter = postItem ? getCharacter(postItem) : undefined
  const name = useName(context.action.playerId)
  const onClick = useOpenItemHelp()(MaterialType.CharacterTile, postItem, itemIndex)
  return (
    <ClickableLine onClick={onClick}>
      <Trans
        i18nKey="log.flip-on-board"
        values={{ player: name }}
        components={{
          ...commonComponents,
          tileBefore: charBefore !== undefined
            ? <CharacterTileMini character={charBefore}/>
            : <span/>,
          tileAfter: charAfter !== undefined
            ? <CharacterTileMini character={charAfter}/>
            : <span/>
        }}
      />
    </ClickableLine>
  )
}
