/** @jsxImportSource @emotion/react */
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

type EffectHeaderProps = {
  effect: string,
  coins: number
}

export const LoseCoinHeader: FC<EffectHeaderProps> = (props) => {
  const { effect, coins } = props
  const player = usePlayerId()
  const rules = useRules<CaptainFlipRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  if (itsMe) {
    return (
      <Trans defaults="header.coins.lose.you" values={{ effect, coins }} />
    )
  }

  return (
    <Trans defaults="header.coins.lose.player" values={{ player: name, effect, coins }} />
  )
}
