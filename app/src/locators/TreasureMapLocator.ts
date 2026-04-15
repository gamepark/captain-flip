import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

/* Treasure Map tokens sit on the central "TreasureMapToken" area.
 *
 * Most boards have a single token. The Observatory board (Board H)
 * sets up with two at the same location, picked at random. When
 * there are two, we offset them horizontally so they don't overlap:
 *   - 1 token  → centered
 *   - 2 tokens → one slightly left (x=0), one slightly right (x=1)
 *
 * We rely on `FillGapStrategy` (see CaptainFlipRules.locationsStrategies)
 * to assign a stable 0-based `x` to each token so the layout stays
 * consistent when the first is taken and only the second remains. */
class TreasureMapLocator extends Locator {
  coordinates = { y: 1 }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const base = { y: 1, z: 0 }
    const count = context.rules
      .material(MaterialType.TreasureMapToken)
      .location(LocationType.TreasureMapToken)
      .length
    if (count <= 1) return { ...base, x: 0 }
    const index = item.location.x ?? 0
    const offset = 3.5 // cm between the two tokens
    return { ...base, x: index === 0 ? -offset / 2 : offset / 2 }
  }
}

export const treasureMapLocator = new TreasureMapLocator()
