/** @jsxImportSource @emotion/react */
import { isStartPlayerTurn } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { separatorTextCss, whoCss } from '../logStyles'
import { Props, useName } from '../shared'
import { getRound } from '../utils'

/* Italic separator inserted whenever a new player turn starts. The
 * outer flex container (separatorCss) hosts the horizontal fading
 * rules; the inner span bumps its own font-size so the em-based
 * layout values on the container stay at framework base size. */
export const TurnSeparatorLog: FC<Props> = ({ move, context }) => {
  if (!isStartPlayerTurn(move)) return null
  const name = useName(move.player)
  return (
    <span css={separatorTextCss}>
      <Trans
        i18nKey="log.turn"
        values={{ player: name, round: getRound(context.game) }}
        components={{ who: <span css={whoCss}/> }}
      />
    </span>
  )
}
