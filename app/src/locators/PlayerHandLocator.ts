import { HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { getPanelTablePosition } from '../panels/PanelPosition'
import { isMiniLayout } from './ViewHelper'

class PlayerHandLocator extends HandLocator {
  getCoordinates(_location: Location, context: MaterialContext) {
    if (isMiniLayout(context)) {
      const { x: centralX } = getPanelTablePosition(1, context.rules.players.length)
      if (context.rules.players.length === 3) {
        // 3p: hand sits at the top-right corner of the bag.
        return { x: centralX - 16.77, y: 16.8, z: 5 }
      }
      return { x: centralX - 17.8, y: 12.7, z: 5 }
    }
    // y matches onTopOfBag (clothBag.y - 8 = 12) so the pioche tile
    // lands flat without a visible drop after the waypoint.
    return { x: 0, y: 12, z: 5 }
  }
}

export const playerHandLocator = new PlayerHandLocator()
