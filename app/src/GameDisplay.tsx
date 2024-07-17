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
      margin={{ top: 7 + (boundaries.top ?? 0), left: 0, right: 0, bottom: boundaries.bottom ?? 0 }}
      //css={css`background-color: #ffffff20`}
    >
      <GameTableNavigation css={navigationCss(players.length)} scaleStep={0.2}/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const tableSize = (players: number) => {
  if (players === 2) {
    return {
      xMin: -32,
      xMax: 32,
      yMin: -5,
      yMax: 26,
    }
  }

  return {
    xMin: -48,
    xMax: 48,
    yMin: -26,
    yMax: 26,
    bottom: players > 4? 7: 0,
    top: players > 4? 5: 0,
  }
}

const navigationCss = (players: number) => {
  if (players === 2 || players === 5) {
    return css`
      left: 32em
    `
  }

  if (players > 3) {
    return css`
      left: 50%;
      transform: translateX(-50%);
    `
  }

  return undefined
}
