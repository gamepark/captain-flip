import { getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getPanelTablePosition, getPanelHeight } from '../panels/PanelPosition'

class OnPlayerPanelLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const { x, y } = getPanelTablePosition(index, context.rules.players.length)
    return { x, y, z: 50 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.location.rotation) transforms.push('rotateY(180deg)')
    transforms.push('scale(0.001)')
    return transforms
  }
}

class BelowPlayerPanelLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const { x, y } = getPanelTablePosition(index, context.rules.players.length)
    return { x, y: y + getPanelHeight() + 1, z: 50 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.location.rotation) transforms.push('rotateY(180deg)')
    return transforms
  }
}

class OnTopOfBagLocator extends Locator {
  coordinates = { x: 0, y: 12, z: 1 }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.location.rotation) transforms.push('rotateY(180deg)')
    return transforms
  }
}

export const onPlayerPanelLocator = new OnPlayerPanelLocator()
export const belowPlayerPanelLocator = new BelowPlayerPanelLocator()
export const onTopOfBagLocator = new OnTopOfBagLocator()
