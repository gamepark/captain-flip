import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPanelTablePosition } from '../panels/PanelPosition'
import { isMiniLayout } from './ViewHelper'

class CoinPileLocator extends PileLocator {
  radius = 1

  getCoordinates(_location: Location, context: MaterialContext) {
    let baseX = 0
    let baseY = 7
    if (isMiniLayout(context)) {
      // Sit just to the right of the viewed central board, upper area.
      const { x: centralX } = getPanelTablePosition(1, context.rules.players.length)
      baseX = centralX + (context.rules.players.length === 3 ? 18 : 19.5)
      baseY = context.rules.players.length === 4 ? 18.5 : 20.5
    }
    const coordinates = { x: baseX, y: baseY, z: 0 }

    const deltaX = 2.5
    const deltaY = 2
    if (_location.id === 10) {
      coordinates.x += deltaX
      coordinates.y += deltaY
    } else if (_location.id === 5) {
      coordinates.x -= deltaX
      coordinates.y += deltaY
    } else if (_location.id === 3) {
      coordinates.x += deltaX
      coordinates.y -= deltaY
    } else {
      coordinates.x -= deltaX
      coordinates.y -= deltaY
    }

    return coordinates
  }
}

export const coinPileLocator = new CoinPileLocator()
