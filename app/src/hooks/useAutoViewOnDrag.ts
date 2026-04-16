import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { useDndContext, useDndMonitor } from '@dnd-kit/core'
import { usePlay, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useCallback } from 'react'
import { encodeView, getSides } from '../locators/ViewHelper'

/**
 * When the current player starts dragging one of their own tiles and
 * their board is NOT currently in one of the two visible slots, we:
 * 1. Switch the left slot to their board via changeView
 * 2. After React re-renders, force @dnd-kit to re-measure ALL
 *    droppable containers by passing their IDs explicitly.
 */
export const useAutoViewOnDrag = () => {
  const rules = useRules<CaptainFlipRules>()
  const me = usePlayerId()
  const play = usePlay()
  const { measureDroppableContainers, droppableContainers } = useDndContext()

  const onDragStart = useCallback(() => {
    if (!rules || me === undefined) return

    const { left, right } = getSides({ rules, player: me } as any)
    if (left === me || right === me) return

    play(MaterialMoveBuilder.changeView(encodeView(me, right)), { transient: true })

    // After React re-renders, force @dnd-kit to re-measure every
    // droppable container. We pass all known IDs so the measurement
    // picks up the newly-visible drop zones at their real size.
    setTimeout(() => {
      const ids = droppableContainers.getEnabled().map(c => c.id)
      measureDroppableContainers(ids)
    }, 100)
  }, [rules, me, play, measureDroppableContainers, droppableContainers])

  useDndMonitor({ onDragStart })
}
