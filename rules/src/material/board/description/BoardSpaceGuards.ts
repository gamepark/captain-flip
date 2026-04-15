import { BoardSpaceEffect } from './BoardCommon'
import { BoardSpaceType } from './BoardSpaceType'

/** Narrowed shapes for effects that carry their own extra fields.
 *  These aren't exhaustive — only the variants we actively need
 *  to read in multiple places are declared. Add more as needed. */
export type BombEffect = { type: BoardSpaceType.Bomb } & BoardSpaceEffect
export type NoneEffect = { type: BoardSpaceType.None } & BoardSpaceEffect
export type BombWhenFilled = BoardSpaceEffect & { bombWhenFilled: true }

/** Type guard for `BoardSpaceType.Bomb` spaces (Board I's fixed
 *  bombs). Matches only the primary type, not `bombWhenFilled`
 *  modifiers. */
export const isBombEffect = (
  effect: BoardSpaceEffect | undefined
): effect is BombEffect => effect?.type === BoardSpaceType.Bomb

/** Type guard for any effect that carries a truthy `bombWhenFilled`
 *  modifier (typically on a TreasureMap or None base type). */
export const hasBombWhenFilled = (
  effect: BoardSpaceEffect | undefined
): effect is BombWhenFilled => !!effect?.bombWhenFilled
