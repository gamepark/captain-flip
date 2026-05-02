import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

/**
 * Captain Flip stores the currently viewed player id in `game.view`
 * (a single PlayerId, set via `MaterialMoveBuilder.changeView` with
 * `{ transient: true }`). With 3+ players the viewed board is shown
 * full size at the centre while the others are minis under their
 * panels. With 2 players the view is unused — both boards are shown
 * full size side by side.
 */

export function getViewedPlayer(context: MaterialContext): PlayerId {
  const players = context.rules.players
  const view = (context.rules as any).game.view
  if (typeof view === 'number' && players.includes(view as PlayerId)) {
    return view as PlayerId
  }
  return (context.player ?? players[0]) as PlayerId
}

/** True when the layout uses one centred viewed board + minis. */
export function isMiniLayout(context: MaterialContext): boolean {
  return context.rules.players.length >= 3
}

/** Visibility helper for items located under a player's board.
 *  - 2p: both players' items always visible.
 *  - 3+: every player's items are still visible (minis show them too). */
export function isPlayerVisible(_item: MaterialItem, _context: ItemContext): boolean {
  return true
}
