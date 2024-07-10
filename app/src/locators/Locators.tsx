import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { ItemLocator } from '@gamepark/react-game'
import { adventureBoardCharacterTileLocator } from './AdventureBoardCharacterTileLocator'
import { adventureBoardLocation } from './AdventureBoardLocator'
import { clothBagLocator } from './ClothBagLocator'
import { coinPileLocator } from './CoinPileLocator'
import { playerHandLocator } from './PlayerHandLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.AdventureBoard]: adventureBoardLocation,
  [LocationType.AdventureBoardCharacterTile]: adventureBoardCharacterTileLocator,
  [LocationType.ClothBag]: clothBagLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.CoinStock]: coinPileLocator
}
