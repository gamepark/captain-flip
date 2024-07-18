import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game/dist/components/material/animations/MaterialGameAnimations'
import { isCreateItemType } from '@gamepark/rules-api/dist/material/moves/items/CreateItem'
import { isDeleteItemType } from '@gamepark/rules-api/dist/material/moves/items/DeleteItem'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'

export const captainFlipAnimations = new MaterialGameAnimations()

captainFlipAnimations
  .when()
  .move((move) => isCreateItemType(MaterialType.Coin)(move) || isDeleteItemType(MaterialType.Coin)(move))
  .duration(0.6)

captainFlipAnimations
  .when()
  .move(isMoveItemType(MaterialType.TreasureMapToken))
  .duration(0.5)

captainFlipAnimations
.when()
.move((move, context) => {
  if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
  const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)!
  return (
    item.location.type === LocationType.PlayerHand && move.location.type === LocationType.PlayerHand ||
    item.location.type === LocationType.AdventureBoardCharacterTile && move.location.type === LocationType.AdventureBoardCharacterTile
  )
})
.duration(0.6)