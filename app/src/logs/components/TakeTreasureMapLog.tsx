/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { treasureMapImages } from '../../effects/treasureMapImages'
import TreasureMapTokenImg from '../../images/TreasureMapToken.png'
import { ClickableLine, commonComponents, Props, useName } from '../shared'
import { useOpenItemHelp } from '../useOpenItemHelp'

/* Treasure map taken / received — covers Cartographer effect, board
 * TreasureMap effect, board CoinAndTreasureMap effect, and any other
 * MoveItem(TreasureMapToken → PlayerTreasureMapToken). We read the
 * actual token type (Base / Cursed / Inflamed / Gambler / Kraken /
 * AllDirections) from the moved item's `id` so the log shows the
 * matching illustration instead of a generic parchment. The whole
 * line is wrapped in ClickableLine so clicking anywhere opens the
 * framework's material help modal for that token. */
export const TakeTreasureMapLog: FC<Props> = ({ move, context }) => {
  const player = (move as any).location?.player ?? context.action.playerId
  const name = useName(player)

  const rules = new CaptainFlipRules(context.game)
  const itemIndex = (move as any).itemIndex
  const token = rules.material(MaterialType.TreasureMapToken).getItem(itemIndex)
  const type = token?.id as TreasureMapType | undefined
  const src = type !== undefined ? treasureMapImages[type] : TreasureMapTokenImg
  const onClick = useOpenItemHelp()(MaterialType.TreasureMapToken, token, itemIndex)

  return (
    <ClickableLine onClick={onClick}>
      <Trans
        i18nKey="log.take-map"
        values={{ player: name }}
        components={{
          ...commonComponents,
          map: <img src={src} alt="" css={mapMiniCss}/>
        }}
      />
    </ClickableLine>
  )
}

const mapMiniCss = css`
  display: inline-block;
  vertical-align: -0.9em;
  width: 2.5em;
  height: 2.5em;
  object-fit: contain;
  margin: 0 0.2em;
  cursor: pointer;
  transition: transform 0.15s ease-out;

  &:hover {
    transform: scale(1.08);
  }
`
