import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { MaterialContext } from '@gamepark/react-game'

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
  const view = context.rules.game.view
  if (typeof view === 'number' && players.includes(view as PlayerId)) {
    return view as PlayerId
  }
  return (context.player ?? players[0]) as PlayerId
}

/** True when the layout uses one centred viewed board + minis. */
export function isMiniLayout(context: MaterialContext): boolean {
  return context.rules.players.length >= 3
}
