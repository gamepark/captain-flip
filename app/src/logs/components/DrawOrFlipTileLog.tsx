/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { getCharacter } from '@gamepark/captain-flip/rules/GetCharacter'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { whoCss } from '../logStyles'
import { CharacterTileMini, ClickableLine, commonComponents, Props, useName } from '../shared'
import { useOpenItemHelp } from '../useOpenItemHelp'

/* Draw / flip in hand dispatcher.
 *
 * The framework calls this component for any MoveItem(CharacterTile)
 * landing in PlayerHand. Two distinct events fall into that bucket:
 *
 *   - A draw (ClothBag → PlayerHand) — emitted as a CONSEQUENCE of a
 *     StartPlayerTurn(DrawCharacterTile) move, so consequenceIndex is
 *     defined.
 *
 *   - A flip in hand (PlayerHand → PlayerHand with a different
 *     rotation) — emitted directly via PlayTileRule.getPlayerMoves().
 *     The move IS context.action.move so consequenceIndex is undefined.
 *
 * For the flip variant we read BOTH the pre-flip face (from the raw
 * game state) and the post-flip face (after applying the move on a
 * cloned game) so the log renders "{before} → {after}". The whole
 * line is wrapped in ClickableLine so clicking anywhere on it opens
 * the tile's help modal.
 */
export const DrawOrFlipTileLog: FC<Props> = ({ move, context }) => {
  const player = (move as any).location?.player ?? context.action.playerId
  const name = useName(player)
  const isFlip = context.consequenceIndex === undefined
  const openHelp = useOpenItemHelp()
  const itemIndex = (move as any).itemIndex

  if (!isFlip) {
    // Draw from the bag. The tile id is hidden by the ClothBag hiding
    // strategy, but the move carries a `reveal` field for the player
    // who drew it. In late game (end-of-game scoring), `reveal` is
    // stripped but `item.id` is the plain revealed value — we fall
    // back to that. If both are unavailable we skip the tile icon.
    const rawItem = new CaptainFlipRules(context.game)
      .material(MaterialType.CharacterTile)
      .getItem(itemIndex)
    const revealedId = (move as any).reveal?.id ?? rawItem?.id
    const fauxItem = revealedId !== undefined && rawItem
      ? { ...rawItem, id: revealedId, location: { ...rawItem.location, rotation: (move as any).location?.rotation } }
      : undefined
    const character = fauxItem && typeof fauxItem.id === 'object' ? getCharacter(fauxItem) : undefined
    const onClick = openHelp(MaterialType.CharacterTile, fauxItem ?? rawItem, itemIndex)
    return (
      <ClickableLine onClick={onClick}>
        <Trans
          i18nKey="log.draw"
          values={{ player: name }}
          components={{
            ...commonComponents,
            who: <span css={whoCss}/>,
            tile: character !== undefined
              ? <CharacterTileMini character={character}/>
              : <span/>
          }}
        />
      </ClickableLine>
    )
  }

  // Flip in hand — read both pre-flip and post-flip faces.
  const preItem = new CaptainFlipRules(context.game)
    .material(MaterialType.CharacterTile)
    .getItem(itemIndex)
  const charBefore = preItem ? getCharacter(preItem) : undefined
  const rules = new CaptainFlipRules(structuredClone(context.game))
  rules.play(move)
  const postItem = rules.material(MaterialType.CharacterTile).getItem(itemIndex)
  const charAfter = postItem ? getCharacter(postItem) : undefined
  const onClick = openHelp(MaterialType.CharacterTile, postItem, itemIndex)
  return (
    <ClickableLine onClick={onClick}>
      <Trans
        i18nKey="log.flip-hand"
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
