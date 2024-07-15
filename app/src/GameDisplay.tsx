/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  const players = usePlayers()
  if (!players.length) return null
  const boundaries = tableSize(players.length)
  return <>
    <GameTable
      verticalCenter
      {...boundaries}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      css={css`background-color: #ffffff20`}
    >
      <GameTableNavigation/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const tableSize = (players: number) => {
  if (players === 2) {
    return {
      xMin: -33,
      xMax: 33,
      yMin: -5,
      yMax: 26
    }
  }

  return {
    xMin: -48,
    xMax: 48,
    yMin: -26,
    yMax: 26
  }
}
