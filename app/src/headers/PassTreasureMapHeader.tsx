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
  const passLeft = legalMoves.find(isCustomMoveType(CustomMoveType.PassLeft))
  const passRight = legalMoves.find(isCustomMoveType(CustomMoveType.PassRight))

  if (itsMe) {
    return (
      <Trans i18nKey="header.pass-map.you"
        components={{
          left: <PlayMoveButton move={passLeft!} />,
          right: <PlayMoveButton move={passRight!} />
        }}
      />
    )
  }
  return <Trans i18nKey="header.pass-map.player" values={{ player: name }} />
}
