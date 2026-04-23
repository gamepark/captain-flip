import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC, useState } from 'react'
import { useAutoViewOnDrag } from '../hooks/useAutoViewOnDrag'
import { CaptainFlipPlayerPanel } from './CaptainFlipPlayerPanel'

export const PlayerPanels: FC = () => {
  useAutoViewOnDrag()
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<CaptainFlipRules>()!
  const me = usePlayerId()
  const allPlayers = rules.players
  const n = allPlayers.length
  const boardType = rules.remind<BoardType>(Memory.Board)
  const showNeighbors = me !== undefined && [BoardType.BoardI, BoardType.BoardH].includes(boardType) && n > 2

  const myIndex = allPlayers.indexOf(me ?? allPlayers[0])
  const leftNeighborId = showNeighbors ? allPlayers[(myIndex - 1 + n) % n] : undefined
  const rightNeighborId = showNeighbors ? allPlayers[(myIndex + 1) % n] : undefined

  // At most one side picker may be open at a time across all panels.
  // The panel holds no local state for this — it asks the parent.
  const [openPickerFor, setOpenPickerFor] = useState<PlayerId | undefined>(undefined)

  return (
    <>
      {players.map((player) =>
        <CaptainFlipPlayerPanel
          key={player.id}
          player={player}
          isLeftNeighbor={player.id === leftNeighborId}
          isRightNeighbor={player.id === rightNeighborId}
          isPickerOpen={openPickerFor === player.id}
          onRequestPicker={(open) => setOpenPickerFor(open ? player.id : undefined)}
        />
      )}
    </>
  )
}
