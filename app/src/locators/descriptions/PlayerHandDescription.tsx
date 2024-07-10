import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { getRelativePlayerIndex, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FlipButton } from '../component/FlipButton'

export class PlayerHandDescription extends LocationDescription {
  height = 1.7
  width = 1.7

  getLocations(context: MaterialContext) {
    if (!context.player) return []
    return [{
      type: LocationType.PlayerHand,
      player: context.player
    }]
  }

  alwaysVisible = true
  getCoordinates(location: Location, context: LocationContext){
    const coordinates = this.getHandPosition(location, context)
    coordinates.x += 1.7
    coordinates.y -= 1.7
    return coordinates
  }

  getHandPosition(location: Location, context: LocationContext){
    const index = getRelativePlayerIndex(context, location.player)
    return this.getBoardPosition(index)
  }

  getBoardPosition(index: number) {
    switch (index) {
      case 0:
        return { x: -20, y: 13, z: 0.05}
      case 1:
        return { x: -20, y: -13, z: 0.05}
      case 2:
        return { x: 20, y: -13, z: 0.05}
      case 3:
        return { x: 20, y: 13, z: 0.05}
      case 4:
      default:
        return { x: 0, y: 0, z: 0.05}
    }
  }

  content = FlipButton
}