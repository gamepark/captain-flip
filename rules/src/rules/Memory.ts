import { PlayerId } from '../PlayerId'

export enum Memory {
  Flipped = 1,
  PlacedCard,
  Board,
  BoardEffect,
  BoardEndOfGameEffect,
  PlayerCoins
}

export type PlayerCoins = Partial<Record<PlayerId, number>>
