/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { PlayMoveButton, RulesDialog, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { treasureMapImages } from '../effects/treasureMapImages'

type Props = {
  onMinimize: () => void
  onChosen: () => void
}

/** Popup offering one button per available treasure map pick. Shown
 *  only when the helper produced 2+ legal picks. Each button plays
 *  the corresponding MoveItem locally via PlayMoveButton. Uses
 *  `RulesDialog` directly so it inherits the game's parchment theme
 *  (background + framework-provided close button). */
export const PickTreasureMapDialog: FC<Props> = ({ onMinimize, onChosen }) => {
  const me = usePlayerId()
  const rules = useRules<CaptainFlipRules>()!
  const pickMoves = useLegalMoves<MoveItem>(
    (m: any) => isMoveItemType(MaterialType.TreasureMapToken)(m)
      && m.location.type === LocationType.PlayerTreasureMapToken
      && m.location.player === me
  )

  if (pickMoves.length < 2) return null

  return (
    <RulesDialog open={true} close={onMinimize}>
      <DialogContent pickMoves={pickMoves} rules={rules} onChosen={onChosen} />
    </RulesDialog>
  )
}

const DialogContent: FC<{ pickMoves: MoveItem[], rules: CaptainFlipRules, onChosen: () => void }> = ({ pickMoves, rules, onChosen }) => {
  const { t } = useTranslation()
  return (
    <div css={contentCss}>
      <h2 css={titleCss}>{t('pick-map.title', 'Choose a Treasure Map')}</h2>
      <p css={subtitleCss}>{t('pick-map.subtitle', 'Pick the map you want to take.')}</p>
      <div css={choicesCss}>
        {pickMoves.map((move, i) => (
          <MapChoice key={i} move={move} rules={rules} onChosen={onChosen} />
        ))}
      </div>
    </div>
  )
}

const MapChoice: FC<{ move: MoveItem, rules: CaptainFlipRules, onChosen: () => void }> = ({ move, rules, onChosen }) => {
  const { t } = useTranslation()
  const item = rules.material(MaterialType.TreasureMapToken).getItem(move.itemIndex)
  const type = (item?.id as TreasureMapType) ?? TreasureMapType.Base

  const srcIsPlayer = item?.location.type === LocationType.PlayerTreasureMapToken
  const srcPlayer = srcIsPlayer ? item?.location.player : undefined
  const srcName = usePlayerName(srcPlayer)

  return (
    <div css={choiceCss}>
      <PlayMoveButton move={move} onPlay={onChosen} css={buttonCss}>
        <img
          src={treasureMapImages[type] ?? treasureMapImages[TreasureMapType.Base]}
          alt=""
          css={mapImgCss}
        />
      </PlayMoveButton>
      <div css={captionCss}>
        {srcPlayer
          ? t('pick-map.from-player', { player: srcName, defaultValue: "From {player}'s board" })
          : t('pick-map.from-center', 'From the center')}
      </div>
    </div>
  )
}

const contentCss = css`
  padding: 2em 3em 2em;
  min-width: 60em;
  text-align: center;
`

const titleCss = css`
  margin: 0 0 0.3em;
  font-size: 3.2em;
  font-weight: 800;
  font-style: italic;
  color: #2b1d10;
  text-shadow: 0 0.04em 0 rgba(243, 231, 204, 0.6);
`

const subtitleCss = css`
  margin: 0 0 1.5em;
  font-size: 1.9em;
  font-style: italic;
  color: #6a4c2b;
`

const choicesCss = css`
  display: flex;
  gap: 2em;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`

const choiceCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
`

const buttonCss = css`
  appearance: none;
  border: 0.12em solid rgba(43,29,16,0.5);
  background: linear-gradient(180deg, #f3e7cc, #d9c393);
  border-radius: 0.4em;
  padding: 1em;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease, background 150ms ease;
  box-shadow: 0 0.2em 0.4em rgba(0,0,0,0.25);

  &:hover {
    background: linear-gradient(180deg, #faf0d6, #e9decb);
    transform: translateY(-0.15em);
    box-shadow: 0 0.35em 0.7em rgba(0,0,0,0.35), 0 0 0 0.15em rgba(139,30,30,0.5);
  }
  &:active { transform: translateY(0.05em); }
`

const mapImgCss = css`
  height: 16em;
  width: auto;
  display: block;
  filter: drop-shadow(0 0.15em 0.3em rgba(0, 0, 0, 0.4));
`

const captionCss = css`
  font-size: 1.6em;
  font-style: italic;
  color: #6a4c2b;
  max-width: 14em;
  text-align: center;
  line-height: 1.2;
`
