import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

type EffectHeaderProps = {
  effect: string,
}

export const GetTreasureMap: FC<EffectHeaderProps> = ({ effect }) => {
  const player = usePlayerId()
  const rules = useRules<CaptainFlipRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  if (itsMe) {
    return (
      <Trans defaults="header.map.you" values={{ effect: effect }}/>
    )
  }

  return (
    <Trans defaults="header.map.player" values={{ player: name, effect: effect }}/>
  )
}