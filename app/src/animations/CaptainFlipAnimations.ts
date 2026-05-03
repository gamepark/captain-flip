import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'
import { onTopOfBagLocator } from '../locators/OnPlayerPanelLocator'

export const captainFlipAnimations = new MaterialGameAnimations()

// Coin create/delete: short
captainFlipAnimations
  .when()
  .move((move) => isCreateItemType(MaterialType.Coin)(move) || isDeleteItemType(MaterialType.Coin)(move))
  .duration(1)

// Coin transfer (moveMoney)
captainFlipAnimations
  .when()
  .move(isMoveItemType(MaterialType.Coin))
  .duration(0.8)

// Treasure map move
captainFlipAnimations
  .when()
  .move(isMoveItemType(MaterialType.TreasureMapToken))
  .duration(0.5)

// Flip in hand or on board
captainFlipAnimations
  .when()
  .move((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return (
      (item.location.type === LocationType.PlayerHand && move.location.type === LocationType.PlayerHand) ||
      (item.location.type === LocationType.AdventureBoardCharacterTile && move.location.type === LocationType.AdventureBoardCharacterTile)
    )
  })
  .duration(0.6)

// Tile placement (hand or cell → AdventureBoard cell). Force a flat
// trajectory — the framework default adds a Z arc that, on mini
// boards, looks exaggerated next to the shrunk final tile.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (move.location.type !== LocationType.AdventureBoardCharacterTile) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type !== LocationType.AdventureBoardCharacterTile
  })
  .duration(800)
  .trajectory(() => ({ elevation: false, waypoints: [] }))

// Pioche (2-3p): slide flat to the top of the bag, then straight to the hand.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    if (context.rules.players.length >= 4) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type === LocationType.ClothBag && move.location.type === LocationType.PlayerHand
  })
  .duration(1200)
  .trajectory((_context, move) => {
    const dest = (move as any).location
    return {
      elevation: false,
      waypoints: [
        { at: 0.35, locator: onTopOfBagLocator, location: () => ({ rotation: dest.rotation }), elevation: 0 }
      ]
    }
  })

// Pioche (4-5p): straight bag → hand, no waypoint. Avoids the late
// nudge of existing hand tiles when the new one settles in the fan.
captainFlipAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.CharacterTile)(move)) return false
    if (!move.location.player) return false
    if (context.rules.players.length < 4) return false
    const item = context.rules.material(MaterialType.CharacterTile).getItem(move.itemIndex)
    return item.location.type === LocationType.ClothBag && move.location.type === LocationType.PlayerHand
  })
  .duration(1200)
  .trajectory(() => ({ elevation: false, waypoints: [] }))
