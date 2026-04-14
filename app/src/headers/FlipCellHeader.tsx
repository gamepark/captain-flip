import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const FlipCellHeader = () => {
  const player = usePlayerId()
  const rules = useRules<CaptainFlipRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  if (itsMe) {
    return <Trans i18nKey="header.flip-cell.you" />
  }
  return <Trans i18nKey="header.flip-cell.player" values={{ player: name }} />
}
