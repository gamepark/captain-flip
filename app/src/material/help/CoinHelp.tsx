import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { CoinHelper } from '@gamepark/captain-flip/rules/helper/CoinHelper'
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { flourishCss, flourishLineCss, flourishMarkCss, headlineCss, ledeCss, smallHelpRootCss } from './helpStyles'

export const CoinHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const rules = useRules<CaptainFlipRules>()!
  const isStock = item.location?.type === LocationType.CoinStock
  const player = usePlayerId()
  const name = usePlayerName(item.location?.player)
  const itsMe = player && item.location?.player === player
  const coins = !isStock ? new CoinHelper(rules.game, item.location?.player!).coins : 0
  return (
    <div css={smallHelpRootCss}>
      <h2 css={headlineCss}>
        <Trans i18nKey="coins.stock"/>
      </h2>
      <div css={flourishCss}>
        <span css={flourishLineCss}/>
        <span css={flourishMarkCss}>✦</span>
        <span css={flourishLineCss}/>
      </div>
      {!isStock && itsMe && (
        <p css={ledeCss}>
          <Trans i18nKey="coins.you" values={{ number: coins }}/>
        </p>
      )}
      {!isStock && !itsMe && (
        <p css={ledeCss}>
          <Trans i18nKey="coins.player" values={{ player: name, number: coins }}/>
        </p>
      )}
      <p css={ledeCss}>
        <Trans i18nKey="coins.victory"/>
      </p>
    </div>
  )
}