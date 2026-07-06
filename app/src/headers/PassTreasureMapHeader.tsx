import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CustomMoveType } from '@gamepark/captain-flip/material/CustomMoveType'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PassTreasureMapHeader = () => {
  const player = usePlayerId()
  const rules = useRules<CaptainFlipRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()
  // On-screen "left" is the previous player, "right" the next player.
  const passPrevious = legalMoves.find(isCustomMoveType(CustomMoveType.PassPrevious))
  const passNext = legalMoves.find(isCustomMoveType(CustomMoveType.PassNext))

  if (itsMe) {
    return (
      <Trans i18nKey="header.pass-map.you"
        components={{
          left: <PlayMoveButton move={passPrevious!} />,
          right: <PlayMoveButton move={passNext!} />
        }}
      />
    )
  }
  return <Trans i18nKey="header.pass-map.player" values={{ player: name }} />
}
