import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

/**
 * The framework's `game.view` is a single `number`. We need TWO viewed
 * players (left + right) so we pack both as a sequence of (slotCode,
 * playerId) pairs in base 10:
 *
 *     view = SLOT_LEFT * 1000 + leftPlayerId * 100 + SLOT_RIGHT * 10 + rightPlayerId
 *
 * Slot codes: 1 = left, 2 = right. PlayerIds are 1..5.
 * Example: left=1, right=3  →  1 1 2 3  →  1123
 *          left=4, right=5  →  1 4 2 5  →  1425
 *
 * This encoding stays readable when you inspect `game.view` in devtools
 * and is trivially extensible if we ever need a third slot.
 *
 * We play the LocalMove via `MaterialMoveBuilder.changeView(encoded)`
 * with `{ transient: true }` so the framework drops it into `game.view`
 * without touching server state or history.
 */

const SLOT_LEFT = 1
const SLOT_RIGHT = 2

export const encodeView = (left: PlayerId, right: PlayerId): number =>
  SLOT_LEFT * 1000 + left * 100 + SLOT_RIGHT * 10 + right

export const decodeView = (view: number | undefined): { left: PlayerId, right: PlayerId } | undefined => {
  if (view === undefined || view < 1000) return undefined
  const s1 = Math.floor(view / 1000)
  const p1 = Math.floor((view / 100) % 10) as PlayerId
  const s2 = Math.floor((view / 10) % 10)
  const p2 = (view % 10) as PlayerId
  if (p1 < 1 || p2 < 1) return undefined
  // Normalize on slot codes — we accept either order in the encoded
  // pairs even though our encoder always puts left first.
  const left  = s1 === SLOT_LEFT ? p1 : s2 === SLOT_LEFT ? p2 : undefined
  const right = s1 === SLOT_RIGHT ? p1 : s2 === SLOT_RIGHT ? p2 : undefined
  if (left === undefined || right === undefined) return undefined
  return { left, right }
}

/** Default assignment when `game.view` is not set: current player on
 *  the left, next player on the right. Falls back to players[0]/players[1]
 *  for spectators. */
function defaultSides(context: MaterialContext): { left: PlayerId, right: PlayerId } {
  const players = context.rules.players
  const me = context.player ?? players[0]
  const meIndex = players.indexOf(me)
  const next = players[(meIndex + 1) % players.length]
  return { left: me, right: next }
}

export function getSides(context: MaterialContext): { left: PlayerId, right: PlayerId } {
  const view: number | undefined = (context.rules as any).game.view
  const decoded = decodeView(view)
  if (decoded) return decoded
  return defaultSides(context)
}

export function getLeftPlayer(context: MaterialContext): PlayerId {
  return getSides(context).left
}

export function getRightPlayer(context: MaterialContext): PlayerId {
  return getSides(context).right
}

export function isPlayerVisible(item: MaterialItem, context: ItemContext): boolean {
  const { left, right } = getSides(context)
  return item.location.player === left || item.location.player === right
}
