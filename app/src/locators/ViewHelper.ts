import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { ItemContext, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export function getViewPlayer(context: MaterialContext): PlayerId {
  const view: PlayerId | undefined = (context.rules as any).game.view
  if (view !== undefined) return view
  const me = context.player ?? context.rules.players[0]
  const players = context.rules.players
  const myIndex = players.indexOf(me)
  return players[(myIndex + 1) % players.length]
}

export function isPlayerVisible(item: MaterialItem, context: ItemContext): boolean {
  const me = context.player ?? context.rules.players[0]
  if (item.location.player === me) return true
  return item.location.player === getViewPlayer(context)
}
