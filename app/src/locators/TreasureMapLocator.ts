import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { getPanelTablePosition } from '../panels/PanelPosition'
import { isMiniLayout } from './ViewHelper'

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
    let baseX = 0
    let baseY = 1
    if (isMiniLayout(context)) {
      const { x: centralX } = getPanelTablePosition(1, context.rules.players.length)
      if (context.rules.players.length === 3 || context.rules.players.length === 4) {
        // 3p: token sits to the right of the coin piles cluster.
        baseX = centralX + 27.5
        baseY = context.rules.players.length === 4 ? 18 : 20.5
      } else {
        // 4p/5p: token sits just above the stock coin piles.
        baseX = centralX + 19.5
        baseY = 13.5
      }
    }
    const count = context.rules
      .material(MaterialType.TreasureMapToken)
      .location(LocationType.TreasureMapToken)
      .length
    if (count <= 1) return { x: baseX, y: baseY, z: 0 }
    const index = item.location.x ?? 0
    const offset = 3.5
    return { x: baseX + (index === 0 ? -offset / 2 : offset / 2), y: baseY, z: 0 }
  }
}

export const treasureMapLocator = new TreasureMapLocator()
