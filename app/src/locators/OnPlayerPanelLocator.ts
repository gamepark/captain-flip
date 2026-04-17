import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { getRelativePlayerIndex, isItemContext, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { getPanelTablePosition, getPanelHeight } from '../panels/PanelPosition'

/** Panel locators are shared by CharacterTile (boolean rotation =
 *  flip face/dos → rotateY(180)) and TreasureMapToken (numeric
 *  rotation 0..3 × 90° around Z). The framework applies `getRotateZ`
 *  separately from `placeItem`, so we return the Z rotation here and
 *  keep the boolean Y-flip inside `placeItem`. */
function getZRotationDegrees(location: Location, context: MaterialContext): number {
  if (!isItemContext(context) || context.type !== MaterialType.TreasureMapToken) return 0
  const rotation = location.rotation
  if (typeof rotation !== 'number') return 0
  return rotation * 90
}

function pushYFlipIfAny(item: MaterialItem, context: ItemContext, transforms: string[]) {
  if (context.type === MaterialType.TreasureMapToken) return
  if (item.location.rotation) transforms.push('rotateY(180deg)')
}

class OnPlayerPanelLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const { x, y } = getPanelTablePosition(index, context.rules.players.length)
    return { x, y, z: 50 }
  }

  getRotateZ(location: Location, context: MaterialContext) {
    return getZRotationDegrees(location, context)
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    pushYFlipIfAny(item, context, transforms)
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

  getRotateZ(location: Location, context: MaterialContext) {
    return getZRotationDegrees(location, context)
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    pushYFlipIfAny(item, context, transforms)
    return transforms
  }
}

class OnTopOfBagLocator extends Locator {
  coordinates = { x: 0, y: 12, z: 1 }

  getRotateZ(location: Location, context: MaterialContext) {
    return getZRotationDegrees(location, context)
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    pushYFlipIfAny(item, context, transforms)
    return transforms
  }
}

export const onPlayerPanelLocator = new OnPlayerPanelLocator()
export const belowPlayerPanelLocator = new BelowPlayerPanelLocator()
export const onTopOfBagLocator = new OnTopOfBagLocator()
