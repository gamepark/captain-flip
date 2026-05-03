/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { treasureMapImages } from '../../effects/treasureMapImages'
import { commonComponents, Props, useName } from '../shared'

/* AllDirections treasure map rotates one notch at the end of every
 * turn. The framework dispatches a MoveItem(TreasureMapToken) whose
 * source AND destination are PlayerTreasureMapToken for the same
 * player — we use that signal to render this log instead of the
 * generic "took a map" line. The `<img/>` rotates with the map's
 * new orientation so the journal shows the side that's now facing
 * up. */
export const RotateTreasureMapLog: FC<Props> = ({ move, context }) => {
  const player = (move as any).location?.player ?? context.action.playerId
  const name = useName(player)
  const rules = new CaptainFlipRules(context.game)
  const itemIndex = (move as any).itemIndex
  const token = rules.material(MaterialType.TreasureMapToken).getItem(itemIndex)
  const type = (token?.id as TreasureMapType) ?? TreasureMapType.AllDirections
  const src = treasureMapImages[type] ?? treasureMapImages[TreasureMapType.Base]
  const newRotation = typeof (move as any).location?.rotation === 'number'
    ? (move as any).location.rotation as number
    : 0

  return (
    <Trans
      i18nKey="log.rotate-map"
      values={{ player: name }}
      components={{
        ...commonComponents,
        map: (
          <img
            src={src}
            alt=""
            css={[mapMiniCss, mapRotatedCss(newRotation * 90)]}
          />
        )
      }}
    />
  )
}

const mapMiniCss = css`
  display: inline-block;
  vertical-align: -0.9em;
  width: 2.5em;
  height: 2.5em;
  object-fit: contain;
  margin: 0 0.2em;
  transition: transform 0.3s ease;
`

const mapRotatedCss = (deg: number) => css`
  transform: rotate(${deg}deg);
`
