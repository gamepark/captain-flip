/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { CoinHelper } from '@gamepark/captain-flip/rules/helper/CoinHelper'
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const CoinHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const rules = useRules<CaptainFlipRules>()!
  const isStock = item.location?.type === LocationType.CoinStock
  const player = usePlayerId()
  const name = usePlayerName(item.location?.player)
  const itsMe = player && item.location?.player === player
  const coins = !isStock? new CoinHelper(rules.game, item.location?.player!).coins: 0
  return (
    <>
      <h2>
        <Trans defaults={'coins.stock'}/>
      </h2>
      {!isStock && itsMe && (
        <p>
          <Trans defaults="coins.you" values={{ number: coins}}/>
        </p>
      )}
      {!isStock && !itsMe && (
        <p>
          <Trans defaults="coins.player" values={{ player: name, number: coins}}/>
        </p>
      )}
      <p>
        <Trans defaults="coins.victory"/>
      </p>
    </>
  )

}