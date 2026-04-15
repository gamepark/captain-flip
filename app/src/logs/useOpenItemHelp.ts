import { usePlay } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'

const { displayMaterialHelp } = MaterialMoveBuilder

/** Hook returning a click handler that opens the Game Park help modal
 *  for a given material item. Used by log components to make their
 *  inline icons clickable: clicking a character mini-tile or treasure
 *  map image opens the same help dialog as clicking the real item on
 *  the board. */
export const useOpenItemHelp = () => {
  const play = usePlay()
  return (
    itemType: number,
    item: MaterialItem | undefined,
    itemIndex?: number,
    displayIndex?: number
  ) => {
    if (!item) return undefined
    return () => play(
      displayMaterialHelp(itemType, item, itemIndex, displayIndex),
      { transient: true }
    )
  }
}
