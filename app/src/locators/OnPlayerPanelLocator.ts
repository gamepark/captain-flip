import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { isItemContext, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { clothBagLocator } from './ClothBagLocator'

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

class OnTopOfBagLocator extends Locator {
  getCoordinates(_location: Location, context: MaterialContext) {
    const { x, y } = clothBagLocator.getCoordinates({} as Location, context)
    return { x, y: y - 8, z: 1 }
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

export const onTopOfBagLocator = new OnTopOfBagLocator()
